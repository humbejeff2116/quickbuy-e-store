import React from 'react';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import {Link} from 'react-router-dom'
import logo from '../../images/logo.png'




export function DoubleCollectionItem(props) {
  const {src,name,price,description,available,id} = props;

  const view = (src,  name, price, description, id, available) => {
    let item =[];
      item.push({ src, name, price,description, id,available });
    localStorage.setItem('view', JSON.stringify(item))
  } 
  return (
    <ErrorBoundary>
     <div className="items-picture-six"  onClick={()=>view(src,name,price,description,id,available)} >   
      <div className="items-six-details">
          <Link to="view-item">   
          <img src={logo} width="80%" height="80%" alt="img" /><br />      
          <span className="product-title"><small>name: {name}</small></span><br />
          <span className="product-price"><small>price: ${price}</small></span><br />
          </Link>
        </div>
          { (!available) ? 
          <div className="product-bttn">
            <p className="product-text-danger"> 
              *Out of stock* 
            </p>
          </div> : <div className="product-bttn">
                      <Link to="/view-item" className="product-link" >
                        <button  onClick={()=>view(src,name,price,description,id,available)} >
                            {/* <i> <FaRegEye className="contact-bttn-icon"/></i> */}
                          View 
                        </button>
                      </Link>
                      </div>  
          }            
      </div>
    </ErrorBoundary>
  )
}