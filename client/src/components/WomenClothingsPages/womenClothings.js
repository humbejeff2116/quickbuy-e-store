import React,{ useEffect, useState } from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent';
import { getWomenCollections } from '../../services/ecormerce.service';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import { Loader } from '../Loader/loader';
import { PageTemplate } from '../PageTemplate/pageTemplate';
import ReactPaginate from 'react-paginate';
import './womenClothings.css';

window.React = React;

export default function WomenClothingsPage( ) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [ err ] = useState('');
    const [skip, setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        window.scrollTo(0,0)
        setLoading(true);
        getWomenCollections(limit,skip)
        .then(response=> response.data)
        .then(products => {
            setProducts(products.data);
            setPageCount(Math.ceil(products.data.length / limit))
            setLoading(false);
        })
        .catch(err => {
            console.error(err.stack);
        })   
       
    },[skip,limit])
    
    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * limit);
        setSkip(offset);
        setLoading(true);
        getWomenCollections(limit,skip)
        .then(response => response.data)
        .then(products => {
            setProducts(products.data)
            setLoading(false);
        })
        .catch(err => console.error(err));   
      }  
      if((!err && products.length < 1) || loading) {
        return(
          <PageTemplate>
          <Loader/>
          </PageTemplate>
        )
    }   
    return(
        <PageTemplate>
        <ErrorBoundary>   
        <div className="women-clothings-container">
            <div className="women-clothings-items-header">
                <h3>Women Clothings</h3>          
            </div>
            <div  className="women-clothings-items-container">
                <div className="women-clothings-items">
                    { 
                        products.map((product, i) =>
                            < SeeAllComp  key ={i} {...product} />
                        )       
                    }
                </div>
                <ReactPaginate
                previousLabel={'prev'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                />           
            </div>
        </div>
        </ErrorBoundary>
        </PageTemplate>     
    )
}