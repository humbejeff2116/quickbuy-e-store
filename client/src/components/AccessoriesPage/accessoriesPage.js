








import React,{useEffect,useState} from 'react'
import SeeAllComp from '../SeeAllPage/seeAllComponent';
import { Loader } from '../Loader/loader';
import {getAccessories} from '../../services/ecormerce.service'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import './accessories.css'
import {PageTemplate} from '../PageTemplate/pageTemplate'
import ReactPaginate from 'react-paginate';
// import {Header} from '../Header/index'



const AccessoriesPage =(props)=>{
    const [loading, setLoading] = useState(false);
    const [products, setProducts] =useState([]);
    const [err,setErr] = useState('');
    const [skip,setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount,setPageCount] = useState(4);

    useEffect(() => {
        window.scrollTo(0,0)
        setLoading(true);
        getAccessories(limit,skip)
        .then(response=> response.data)
        .then(products=> {
            setProducts(products.data);
            setPageCount( Math.ceil(products.data.length / limit))
            setLoading(false);

        })
        .catch(err=>{
            console.error(err.stack);
        })   
       
    }, [skip,limit])
    
    const handlePageClick = (data) => {
     
        let selected = data.selected;
        let offset = Math.ceil(selected * limit);
        setSkip(offset);
        setLoading(true);
        getAccessories(limit,skip)
        .then(response=>response.data)
        .then(products=>{
            if(products.data.length <1){
                setErr('no products returned');
                setLoading(false);
                return;
            }
            setProducts(products.data)
            setLoading(false);
        })
        .catch(err=> console.error(err) );
        
      };  
      if( !err && products.length < 1 || loading){
        return(
          <PageTemplate>
          <Loader/>
          </PageTemplate>
        )
 
    }  

        return (
           
                // <ErrorBoundary>
                <PageTemplate>
               <ErrorBoundary>
        
             
            <div className="accessories-container">

            <div className="accessories-items-header">
                    <h3>Accessories</h3>          
            </div>
            <div  className="accessories-items-container">
                <div className="accessories-items">
                    {
                        products.map((product,i)=>
                            <SeeAllComp  key={i} {...product}/>
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
                // </ErrorBoundary>
         
         
        )
    
}
export default AccessoriesPage;