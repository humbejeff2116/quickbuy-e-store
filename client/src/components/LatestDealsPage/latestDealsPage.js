







import React, {useEffect, useState} from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent'
import './latestDeals.css'
import {getLatestDeals} from '../../services/ecormerce.service'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import {PageLoader} from '../Loader/loader'
import {PageTemplate} from '../PageTemplate/pageTemplate'
import ReactPaginate from 'react-paginate';

window.React = React;



const LatestDealsPage =(props)=>{

    const [loading, setLoading] = useState(false);
    const [products, setProducts] =useState([]);
    const [skip,setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount,setPageCount] = useState(1);
  

     useEffect(()=>{
        window.scrollTo(0,0)
        setLoading(true);
        getLatestDeals(limit,skip)
        .then(response =>{
            setPageCount( Math.ceil(response.productsLength / limit))
            setProducts(response.data )     
        })  
        .catch(err => console.error(err));       
         setLoading(false)
     },[skip,limit]);

    const handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * limit);
        setSkip(offset);
        setLoading(true);
        getLatestDeals(limit,skip)
        .then(response=>response.data)
        .then(products=>setProducts(products))
        .catch(err=>console.error(err));
         setLoading(false);
      };       
        return(
            <PageTemplate>              
            <ErrorBoundary>
            { (loading) && (<PageLoader/> )}
                
            <div className="latest-deals-items">
           
            <div className="latest-deals-items-header">
                    <h3>Latest Deals</h3>          
            </div>
            <div  className="latest-deals-items-container">
                <div className="latest-deals-items">
                        {                         
                            products.map( (product,i)=>
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


export default  LatestDealsPage





