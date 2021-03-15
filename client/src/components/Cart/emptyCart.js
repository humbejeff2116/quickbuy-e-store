import { dom } from '@fortawesome/fontawesome-svg-core'






















import React from 'react'
import {Link} from 'react-router-dom';
import shopping_cart_PNG60 from '../../images/shopping_cart_PNG65.png'



export default function  EmptyCart(props){
    return(
        <div className=" cart-container">
        
          <div className="div1" ></div>
         
          <div className="cart">

            <div className="cart-header">
              <div className="cart-title">
              </div>
              <div className="cart-refresh">
                <button onClick={props.getCart} >Refresh</button>
              </div>
            </div>

            <div className="cart-body">
              <h2 className="cart-warning">No item in your cart</h2> 
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
    )
}