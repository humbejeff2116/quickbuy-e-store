
import React, { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import { Redirect } from 'react-router-dom'
import logo from '../../images/logo.png'



export function DoubleCollectionItem(props) {
  const [redirect, setRedirect] = useState('');
  const {src,name,price,description,available,id} = props;

  const view = (src,  name, price, description, id, available) => {
    let item =[];
      item.push({ src, name, price,description, id,available });
    localStorage.setItem('view', JSON.stringify(item));
    setRedirect('/view-item');
  }
  if(redirect){
    return(
      <Redirect to={redirect} />
    )
  } 
  return (
    <ErrorBoundary>
     <div className="items-picture-six"  onClick={()=>view(src,name,price,description,id,available)} >   
      <div className="items-six-details">
          <img src={logo} width="80%" height="80%" alt="img" /><br />      
          <span className="product-title"><small>name: {name}</small></span><br />
          <span className="product-price"><small>price: ${price}</small></span><br />
        </div>
          { (!available) ? 
          <div className="product-bttn">
            <p className="product-text-danger"> 
              *Out of stock* 
            </p>
          </div> : <div className="product-bttn">
                        <button  onClick={()=>view(src,name,price,description,id,available)} >
                            {/* <i> <FaRegEye className="contact-bttn-icon"/></i> */}
                          View 
                        </button>
                      </div>  
          }            
      </div>
    </ErrorBoundary>
  )
}