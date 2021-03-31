
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
    const [errMssg, setErrMssg] = useState('');
    const [mssg,setMssg] = useState('');
    const [openMobileNav, setOpenMobileNav] = useState(false);
    const [redirect, setRedirect] = useState('');
    let _searchValue = React.createRef();
    const navGifsLinks =  ApplicationData.getNavGifsLinks();
    const navLinks = ApplicationData.getNavLinks();
    const socialLinks =ApplicationData.getSocialLinks();
    const auth = isAuthenticated();

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
   
    const viewItem = (src, name, price, description, id, available) => {
        let item = [];
        item.push({ src, name, price,description, id,available });
         localStorage.setItem('view', JSON.stringify(item));
         window.location ='/view-item'
        //  setRedirect('/view-item');
    }
  
   
    if(redirect){
        return(
            < Redirect to={redirect}/>
        )
    }
    return(
        <>
        <nav className={'header-container scrolled'}>
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
            (searchedProd.length > 0 ) && (
                <div className="search-result-container">
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