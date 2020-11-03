








import React,{useEffect,useState} from 'react'
import LinksPage from '../LinksPage/linksPage'
import { PageLoader } from '../Loader/loader';
import {getAccessories} from '../../services/ecormerce.service'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import './accessories.css'
import {PageTemplate} from '../PageTemplate/pageTemplate'
import ReactPaginate from 'react-paginate';
// import {Header} from '../Header/index'



const AccessoriesPage =(props)=>{
    const [loading, setLoading] = useState(false);
    const [products, setProducts] =useState([]);
    const [skip,setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount,setPageCount] = useState(1);

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
            setProducts(products.data)
            setLoading(false);
        })
        .catch(err=>console.error(err));
        
      };    

        return (
           
                // <ErrorBoundary>
                <PageTemplate>
               <ErrorBoundary>
                {/* <Header /> */}
                { (loading) && <PageLoader/> }
            <div className="accessories-container">

            <div className="accessories-items-header">
                    <h3>Accessories</h3>          
            </div>
            <div  className="accessories-items-container">
                <div className="accessories-items">
                    {
                        products.map((product,i)=>
                            <LinksPage  key={i} {...product}/>
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