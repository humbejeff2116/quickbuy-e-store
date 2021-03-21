import React from 'react';
import './singleCollection.css'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'



export function SingleCollectionItem(props) {
    const {src, name, price, description, available, id} = props;
    const view = (src, name, price, description, id, available) => {
      let item = [];
        item.push({ src, name, price,description, id, available });
       localStorage.setItem('view', JSON.stringify(item))
    }
    return(
      <ErrorBoundary>
      <div className="items-picture">
          <img src={src} alt="img"/>      
          <p className="product-title">{name}</p>
          <p className="product-price"><small>price: </small>${price}</p>
          <span className="product-qnty"> <small>Available : </small>{available}  </span>
          {  
           (available ) ?
           <div className="product-bttn">
              <Link to="/view-item" className="product-link" >
              <button  onClick={()=>view(src,name,price,description,id,available)} >
                  {/* <i> <FaRegEye className="contact-bttn-icon"/></i> */}
                View 
              </button>
              </Link>
            </div>  : <div className="product-bttn">
                      <p className="product-text-danger"> 
                        *Out of stock* 
                      </p>
                      </div>  
          }                      
     </div>
     </ErrorBoundary>
    )
}