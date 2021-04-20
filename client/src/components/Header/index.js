
import React, {useEffect, useState}  from 'react';
import {  NavGifsBar} from './navGifsBar';
import { MainNavBar} from './mainNavBar';
import  { MobileNav } from '../MobileNav/mobileNav';
import { searchProduct } from '../../services/ecormerce.service';
import SearchResult from './SearchComponent/searchResults';
import ApplicationData from '../../data/appData';
import { Redirect } from 'react-router-dom/';
import { isAuthenticated } from '../../services/ecormerce.service';
import './header.css';









export const Header = ( ) => {
    const [searchedProd,setSearchedProd] = useState([]);
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    const [errMssg, setErrMssg] = useState('');
    const [mssg,setMssg] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [openMobileNav, setOpenMobileNav] = useState(false);
    const [redirect, setRedirect] = useState('');
    let _searchValue = React.createRef();
    let _toggleSearchContainer = React.createRef();
    const navGifsLinks =  ApplicationData.getNavGifsLinks();
    const navLinks = ApplicationData.getNavLinks();
    const socialLinks =ApplicationData.getSocialLinks();
    const auth = isAuthenticated();
    let navbarClasses = ['header-container'];

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('click', closeSearchResultComponent);
        return ()=> {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('click', closeSearchResultComponent);
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
            setMssg('');
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
                setMssg('');
                setSearchedProd([]); 
                console.log(errMssg);
                setSearchIsOpen(false);
                return; 
            }
            setMssg(searchedProducts.message);
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
         window.location ='/view-item'
        //  setRedirect('/view-item');
    }
    
    const closeSearchResultComponent = (e) => {    
        if (searchIsOpen && !_toggleSearchContainer.current.contains(e.target)) {      
            setSearchIsOpen(false);
            setSearchedProd([]);
            setMssg('');
            setErrMssg('');     
        }  
    }
  
    if (scrolled) {
        navbarClasses.push('scrolled');
    }
  
   
    if (redirect) {
        return(
            < Redirect to={redirect}/>
        )
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
            />
            {
                (openMobileNav) && <MobileNav />
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