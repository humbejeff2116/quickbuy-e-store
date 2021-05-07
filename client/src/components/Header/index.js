
import React, { useEffect, useState }  from 'react';
import { NavGifsBar } from './navGifsBar';
import { MainNavBar } from './mainNavBar';
import  { MobileNav } from '../MobileNav/mobileNav';
import { searchProduct } from '../../services/ecormerce.service';
import SearchResult from './SearchComponent/searchResults';
import ApplicationData from '../../data/appData';
import { isAuthenticated } from '../../services/ecormerce.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './header.css';
const user = <FontAwesomeIcon  icon={['fas', "user"]}  />
const cart = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}  />













export const Header = ( ) => {
    const [searchedProd,setSearchedProd] = useState([]);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [errMssg, setErrMssg] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [openMobileNav, setOpenMobileNav] = useState(null);
    let _searchValue = React.createRef();
    let _toggleSearchContainer = React.createRef();
    let _toggleMobileNav = React.createRef();
    const navGifsLinks =  ApplicationData.getNavGifsLinks();
    const navLinks = ApplicationData.getNavLinks();
    const socialLinks =ApplicationData.getSocialLinks();
    const auth = isAuthenticated();
    let navbarClasses = ['header-container'];

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('click', closeSearchResultComponent);
        window.addEventListener('click', closeMobileNav);
        return ()=> {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', closeSearchResultComponent);
            window.removeEventListener('click', closeMobileNav);
        }
    });

    const handleScroll = ( ) => {
        const offset = window.scrollY;
        if (offset > 0) {
           setScrolled(true)
        } else {
           setScrolled(false)
        }
    }

    const searchProducts = (e) => { 
        e.preventDefault();
        const searchedProduct = {
            searchValue: _searchValue.current.value
        }
        if (!searchedProduct.searchValue) {
            setSearchedProd([]);
            setSearchIsOpen(false);
            setErrMssg('');
            return;
        }
        searchProduct(searchedProduct)
        .then(response => response.data)
        .then(searchedProducts => {  
            if (searchedProducts.status !== 200) {
                setErrMssg(searchedProducts.errMessage)
                setSearchedProd([]); 
                console.log(errMssg);
                setSearchIsOpen(false);
                return; 
            }
            setSearchedProd(searchedProducts.data);
            setSearchIsOpen(true);
            setErrMssg(''); 
            return searchedProducts;
        })
        .catch(err => {
            console.error('error :' + err);
        });
    }
   
    const viewItem = (src, name, price, description, id, available) => {
        let item = [];
        item.push({ src, name, price,description, id,available });
         localStorage.setItem('view', JSON.stringify(item));
         window.location ='/view-item';
    }
    
    const closeSearchResultComponent = (e) => {    
        if (searchIsOpen && !_toggleSearchContainer.current.contains(e.target)) {      
            setSearchIsOpen(false);
            setSearchedProd([]);
            setErrMssg('');     
        }  
    }
    const closeMobileNav = (e) => { 
        if(_toggleMobileNav.current){
            closeNav();
        } 
        function closeNav(){
            if (openMobileNav && !_toggleMobileNav.current.contains(e.target)) {      
               return setOpenMobileNav(false);
            }  
        }   
    }
    const logOut = ( ) => {
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('user');
    }
  
    if (scrolled) {
        navbarClasses.push('scrolled');
    }
  
    return(
        <>
        <nav className={navbarClasses.join(" ")}>
            <NavGifsBar 
            navGifsLinks={navGifsLinks}
            socialLinks={socialLinks} 
            />
            <MainNavBar 
            openMobileNav={openMobileNav} 
            setOpenMobileNav={setOpenMobileNav}
            searchProducts={searchProducts} 
            searchValue={_searchValue}
            navLinks={navLinks}
            auth={auth}
            logOut={logOut}
            />
            {
                (openMobileNav) && (
                    <MobileNav 
                    MobileNavRef={_toggleMobileNav}
                    auth={auth}
                    logOut={logOut}
                    userIcon={user}
                    cart={cart}
                    />
                )
            }    
        </nav> 
        {
            (searchIsOpen ) && (
                <div  ref={_toggleSearchContainer} className="search-result-container">
                    <div className="search-content">
                    {
                        searchedProd.map((prod ,i)=>
                            <SearchResult key={i} {...prod} onClick={viewItem} />
                        )
                    }  
                    </div>                           
                </div>
            ) 
        }  
        </>
    )
} 