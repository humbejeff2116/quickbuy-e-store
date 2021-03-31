
import React, {useEffect, useState} from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent';
import {getLatestDeals} from '../../services/ecormerce.service';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import {Loader} from '../Loader/loader';
import {PageTemplate} from '../PageTemplate/pageTemplate';
import ReactPaginate from 'react-paginate';
import BackButton from '../BackButton/backButton';
import './latestDeals.css';

window.React = React;

     
export default function LatestDealsPage(props) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [err,setErr] = useState('');
    const [skip,setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount,setPageCount] = useState(1);
  

     useEffect(()=> {
        window.scrollTo(0,0)
        setLoading(true);
        getLatestDeals(limit,skip)
        .then(response => response.data)
        .then(data => {
            console.log(data.data)
            setPageCount( Math.ceil(data.length / limit))
            setProducts(data.data ) 
            setLoading(false)          
        })  
        .catch(err => console.error(err));       
        
     },[skip,limit]);

    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * limit);
        setSkip(offset);
        setLoading(true);
        getLatestDeals(limit,skip)
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
        <div className="latest-deals-container">  
            <div className="latest-deals-items-header">
                <BackButton buttonDivClassName="pages-back-bttn"/>
                <div className="latest-deals-title" >
                    <h3>Latest Deals</h3>    
                </div>       
            </div>
            <div  className="latest-deals-items-container">
                <div className="latest-deals-items">
                    {                         
                        products.map((product, i)=>
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