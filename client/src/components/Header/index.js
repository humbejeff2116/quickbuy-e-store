import React, {useEffect}  from 'react';
import {  NavGifsBar} from './navGifsBar';
import { MainNavBar} from './mainNavBar';
import  { MobileNav } from '../MobileNav/mobileNav';
import { searchProduct } from '../../services/ecormerce.service';
import SearchResult from './SearchComponent/searchResults';
import ApplicationData from '../../data/appData';
import './header.css';



export const Header = ( ) => {
    const [searchedProd,setSearchedProd] = useState([]);
    const [errMssg, setErrMssg] = useState('');
    const [mssg,setMssg] = useState('');
    const [openMobileNav, setOpenMobileNav] = React.useState(false);
    const [scrolled, setScrolled] = React.useState(false);
    let navbarClasses = ['header-container'];
    let _searchValue = React.createRef();
    const navGifsLinks =  ApplicationData.getNavGifsLinks();
    const navLinks = ApplicationData.getNavLinks();
    const socialLinks =ApplicationData.getSocialLinks();

    const searchProducts = (e) => { 
        e.preventDefault();
        const searchedProduct = {
            searchValue: _searchValue.current.value
        }
        if(!searchedProduct.searchValue) {
            setMssg('');
            setSearchedProd([]);
            setErrMssg('');
            return;
        }
        searchProduct(searchedProduct)
        .then(response => response.data)
        .then(searchedProducts => {  
            if(searchedProducts.status !== 200) {
                setErrMssg(searchedProducts.errMessage)
                setMssg('');
                setSearchedProd([]); 
                console.log(errMssg);
                return; 
            }
            setMssg(searchedProducts.message);
            setSearchedProd(searchedProducts.data);
            setErrMssg(''); 
            return searchedProducts;
        })
        .catch(err => {
            console.error('error :' + err);
        });
    }
    
     const handleScroll = ( ) => {
         const offset = window.scrollY;
         if(offset > 0) {
            setScrolled(true)
         } else {
            setScrolled(false)
         }
     }
     useEffect(()=> {
         window.addEventListener('scroll', handleScroll);
         return ()=> {
             window.removeEventListener('scroll',handleScroll);
         }
     });
   
    if(scrolled) {
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
            />
            {
                (openMobileNav) && <MobileNav />
            }    
        </nav>
        {
            (searchedProd.length > 0 ) && searchedProd.map((prod ,i)=>
            <SearchResult key={i} {...prod} />
            ) 
        }
        </>
    )
} 