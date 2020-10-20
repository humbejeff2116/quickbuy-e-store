






import React,{useState,useEffect} from 'react';




const Pagination =({productsPerPage, totalProducts, paginate})=>{
    const pageNumber =[];
    for(let i =1; i <=Math.ceil(totalProducts/productsPerPage);i++){
        pageNumber.push(i)
    }
    return(
        <nav>
            <ul className="pagination">
                {pageNumber.map(number=>
                    <li className="page-item" key={number}><a onClick={()=>paginate(number)} href="!#" className="page-link">{number}</a></li>
                    )}
            </ul>

        </nav>
    )
}

 export const PaginationApp =()=> {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] =useState([]);
    const [skip,setSkip] = useState(0);
    const [limit] = useState(20);
    const [pageCount,setPageCount] = useState(1);
    const indexOfLastPage = pageCount * limit;
     const indexOfFirstPage = indexOfLastPage - limit;
     const currentProducts = products.slice(indexOfFirstPage, indexOfLastPage);
     const url =`http://localhost//popular-collections?limit=${limit}&skip=${skip}`
       const paginate =(pageNumber)=>{
         setSkip(pageNumber);
     }
     useEffect(()=>{
        window.scrollTo(0,0)
        setLoading(true);
        fetch(url)
        .then(response =>{
            setPageCount( Math.ceil(response.productsLength / limit))
           return response.data
            
        })
        .then(products =>{
            setProducts(products)
           
        })
        .catch(err => console.error(err));
         setLoading(false)

     },[skip,limit,url])
     return(
         (loading) ? <p>loading...</p> :
         <div>
              <div className="latest-deals-items">
              <ul>
                        {                   
                            currentProducts.map( (product,i)=>
                                < li key ={i} > {product.name} </li>
                                )
                        }
                </ul>
                        </div>
              <Pagination productsPerPage={limit} totalProducts={products.length} paginate={paginate}/>
         </div>
     )
}

export default Pagination;