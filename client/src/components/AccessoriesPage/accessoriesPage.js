
import React,{ useEffect, useState } from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent';
import { Loader } from '../Loader/loader';
import { getAccessories } from '../../services/ecormerce.service'
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import { PageTemplate } from '../PageTemplate/pageTemplate';
import ReactPaginate from 'react-paginate';
import './accessories.css';




export default function AccssoriesPage (props) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [err,setErr] = useState('');
    const [skip,setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount,setPageCount] = useState(4);

    useEffect(() => {
         window.scrollTo(0,0); 
        setLoading(true);
        getAccessories(limit,skip)
        .then(response => response.data)
        .then(products => {
            setProducts(products.data);
            setPageCount( Math.ceil(products.data.length / limit));
            setLoading(false);
        })
        .catch(err => {
            console.error(err.stack);
            setErr('an Error occured while trying to get content');
            setLoading(false);
        });   
       
    }, [skip,limit])
    
    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * limit);
        setSkip(offset);
        setLoading(true);
        getAccessories(limit,skip)
        .then(response => response.data )
        .then(products => {
            if(products.data.length < 1) {
                setErr('no products returned');
                setLoading(false);
                return;
            }
            setProducts(products.data)
            setLoading(false);
        })
        .catch(err => {
            console.error(err);
            setErr('no products returned');
            setLoading(false); 
        });   
    } 
// implement  a skeleton screen
    if((!err && products.length < 1) || loading) {
        return(
        <PageTemplate>
            <Loader/>
        </PageTemplate>
        )
    } 
    return(
        (products.length > 0) && (
            <PageTemplate>
            <ErrorBoundary>
            <div className="accessories-container">
                <div className="accessories-items-header">
                        <h3>Accessories</h3>          
                </div>
                <div  className="accessories-items-container">
                    <div className="accessories-items">
                        {
                            products.map( (product, i) =>
                                <SeeAllComp  key={i} {...product} />
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
    )   
}