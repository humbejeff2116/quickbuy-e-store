
import React,{ useEffect, useState } from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent';
import { getPopularCollections } from '../../services/ecormerce.service';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import { PageTemplate } from '../PageTemplate/pageTemplate';
import ReactPaginate from 'react-paginate';
import { Loader2 } from '../Loader/loader';
import BackButton from '../BackButton/backButton';
import './popularCollection.css';



export default function PopularCollectionsPage( ) {
    const [loading, setLoading] = useState(false);
    const [products,setProducts] = useState([]);
    const [err] = useState('');
    const [skip, setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        window.scrollTo(0,0)
        setLoading(true);
        getPopularCollections(limit,skip)
        .then(response => response.data)
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
        getPopularCollections(limit,skip)
        .then(response => response.data)
        .then(products => {
            setProducts(products.data)
            setLoading(false);
        })
        .catch(err => console.error(err));      
    } 
      
    if ((!err && products.length < 1) || loading) {
        return(
          <PageTemplate>
          <Loader2/>
          </PageTemplate>
        )
    }  
    return(
        <PageTemplate>
        <ErrorBoundary>     
        <div className="popular-collections-container">
            <div className="popular-collections-items-header">
                <BackButton buttonDivClassName="pages-back-bttn"/>
                <div className="popular-collections-title" >
                    <h3>Popular Collections</h3>    
                </div>           
            </div>
            <div  className="popular-collections-items-container">
                <div className="popular-collections-items">
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