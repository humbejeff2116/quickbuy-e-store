
import React,{ useEffect } from 'react';
import {Link} from 'react-router-dom';
import CartTemplate from './cartTemplate';
import shopping_cart_PNG60 from '../../images/shopping_cart_PNG65.png';




export default function  EmptyCart(props) {
  useEffect(()=> {
    window.scrollTo(0,0);
  },[])
    return(
      <CartTemplate>
        <div className=" cart-container">
          <div className="div1" ></div>
          <div className="cart">
            
            <div className="cart-body">
              <h2 className="cart-warning">No item in your bag</h2> 
              <div className="cart-img">
                <img width="100%" height="100%" src={shopping_cart_PNG60} alt="cart-logo" title="cart logo" /> 
              </div> 
              <div className="cart-button">
                <button ><Link to="/">Start shoping</Link></button> 
              </div>     
            </div> 
          </div>  
          <div className="div3" ></div>
        </div> 
      </CartTemplate>  
    )
}