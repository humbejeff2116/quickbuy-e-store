import React, {useState} from 'react';
import { Redirect, useLocation, useHistory} from 'react-router-dom/';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import './singleCollection.css';


export function SingleCollectionItem(props) {
    const [redirect, setRedirect] = useState('');
    let location = useLocation();
    let history = useHistory();
    const {src, name, price, description, available, id, productSizes} = props;
    const view = (src, name, price, description, id, available, productSizes) => {
      history.push(location.pathname);
      let item = [];
      item.push({ src, name, price,description, id, available,productSizes });
      localStorage.setItem('view', JSON.stringify(item));
      setRedirect('/view-item');
    }
    if (redirect) {
      return(
        <Redirect to={redirect} />
      )
    }
    return(
      <ErrorBoundary>
      <div className="items-picture"  onClick={()=>view(src, name, price, description, id, available, productSizes)}>
          <img src={src} alt="img"/>      
          <p className="product-title">{name}</p>
          <p className="product-price"><small>price: </small>${price}</p>
          <span className="product-qnty"> <small>Available : </small>{available}  </span>
          {  
           (available ) ?
           <div className="product-bttn">
              <button  onClick={()=>view(src,name,price,description,id,available, productSizes)} >
                  {/* <i> <FaRegEye className="contact-bttn-icon"/></i> */}
                View 
              </button>
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