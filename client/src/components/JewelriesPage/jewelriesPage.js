








import React,{useState,useEffect} from 'react';
import SeeAllComp from '../SeeAllPage/seeAllComponent';
import { Loader } from '../Loader/loader';
import {getJewelries} from '../../services/ecormerce.service';
import {PageTemplate} from '../PageTemplate/pageTemplate';
import ReactPaginate from 'react-paginate';
import './jewelries.css';




const JewelriesPage = ( props ) => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [err,setErr] = useState(false)
    // skip is current page
    const [skip,setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount,setPageCount] = useState(4);

   
    useEffect(() => {
        window.scrollTo(0,0)
        setLoading(true);
        getJewelries(limit,skip)
        .then(response => response.data)
        .then(products => {
            if(products.data.length < 1 ){
                setErr('no products returned');
                setLoading(false);
                return;
            }
            setProducts(products.data);
            setPageCount( Math.ceil(products.data.length / limit))
            setLoading(false);

        })
        .catch(err => console.error(err.stack))   
       
    }, [skip,limit])

    const handlePageChange = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * limit);
        setSkip(offset);
        setLoading(true);
        getJewelries(limit,skip)
        .then(response => response.data)
        .then(products => {
            setProducts(products.data)
            setLoading(false);
        })
        .catch(err => console.error(err));
        
      };
      if(!err && products.length < 1 || loading){

        return(
          <PageTemplate>
          <Loader/>
          </PageTemplate>
        )
 
    }

   

   
    

        return (
            <PageTemplate>
               
          
                
               
                <div className="jewelries-container">
                <div className="jewelries-items-header">
                        <h3>Jewelries</h3>          
                </div>
                <div  className="jewelries-items-container">
                    <div className="jewelries-items">
                  
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
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />         
                </div>
                </div> 
                
                </PageTemplate>

          
         
        )

}
export default JewelriesPage;