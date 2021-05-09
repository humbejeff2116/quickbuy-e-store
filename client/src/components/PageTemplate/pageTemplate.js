






import React, { useState, useEffect} from 'react';
import { Header } from '../Header/index';
import { Footer } from '../Footer/index';
import { MobileSearch }   from '../Slider/index';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import SearchResult from '../Header/SearchComponent/searchResults';
import { searchProduct } from '../../services/ecormerce.service';
import './pageTemplate.css';


export const PageTemplate = ({ children }) => {
    const [searchedProd,setSearchedProd] = useState([]);
    const [errMssg, setErrMssg] = useState('');
    const [searchIsOpen, setSearchIsOpen] = useState(false);
    let _mobileSearchValue = React.createRef();
    let _toggleMobileSearchContainer = React.createRef();
    useEffect(()=> {
        window.addEventListener('click', closeSearchResultComponent);  
        return ()=> {
            window.removeEventListener('click', closeSearchResultComponent);
        }
    });
    const searchProducts = (e) => { 
        e.preventDefault();
        const searchedProduct = {
            searchValue: _mobileSearchValue.current.value
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
        if(_toggleMobileSearchContainer.current){
            closeSearchResult()
        }  
        function closeSearchResult(){
            if (searchIsOpen && !_toggleMobileSearchContainer.current.contains(e.target)) {      
                setSearchIsOpen(false);
                setSearchedProd([]);
                setErrMssg('');     
            } 
        }     
    }


    return(
        <>
        <ErrorBoundary>
        <Header/>
        </ErrorBoundary>
        <div className="main-container" id="main-container">
        <MobileSearch
        searchValue={_mobileSearchValue}
        searchProducts={searchProducts} 
         />
        {
            (searchIsOpen ) && (
                <div   className="mobile-search-result-container">
                    <div ref={_toggleMobileSearchContainer} className="mobile-search-content">
                    {
                        searchedProd.map((prod ,i)=>
                            <SearchResult 
                            key={i} 
                            {...prod} 
                            onClick={viewItem}
                            className={"mobile-search-results"} 
                            />
                        )
                    }  
                    </div>                           
                </div>
            ) 
        }  
        {children}                                  
        </div>
        <ErrorBoundary>
        <Footer  />
        </ErrorBoundary>
        </>
    )
}