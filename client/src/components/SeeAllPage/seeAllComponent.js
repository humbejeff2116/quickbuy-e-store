
import React,{ useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import { Redirect } from 'react-router-dom';
import './seeAll.css';


 const SeeAllComp = (props) => { 
  const [redirect, setRedirect] = useState('');
  let location = useLocation();
  let history = useHistory();
  const {src, name, price, description, available, id, productSizes} = props;
  const view = (src, name, price, description, id, available, productSizes) => {
    history.push(location.pathname);
    let item = [];
      item.push({ src, name, price, description, id, available, productSizes });
     localStorage.setItem('view', JSON.stringify(item));
     setRedirect('/view-item');
  }
  if (redirect) {
    return(
      <Redirect to={redirect} />
    )
  } 
 
  return (
    <ErrorBoundary>
      <div className="all-items-picture"  onClick={()=>view(src, name, price, description, id, available, productSizes)} >
          <div className="see-all-items-details">
           
            <img src={src} width="80%" height="80%" alt="img"/><br />            
            <span className="product-title">Name:</span> {name}<br />
            <span className="product-price">Price:</span> ${price}<br />
          
          </div> 
          { 
            (!available) ?
            <div className="product-bttn">
            <p className="product-text-danger"> 
              *Out of stock* 
            </p>
            </div> : <div className="product-bttn">
                          <button  onClick={()=>view(src, name, price, description, id, available, productSizes)} >
                              {/* <i> <FaRegEye className="contact-bttn-icon"/></i> */}
                            View 
                          </button>
                        </div> 
          } 
      </div>
      </ErrorBoundary>
  )
}
export default SeeAllComp;