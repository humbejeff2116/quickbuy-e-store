






import React from 'react'
import {Link} from 'react-router-dom';
import CartItem from './cartItem';



export default function FullCart(props){
    return(
        <div className=" full-cart-container">
        <div className="full-cart">

          <div className="full-cart-header">
          <h2 className="full-cart-title">Cart</h2> 
          </div>

          <div className="full-cart-body" >           
            {

                props.products.map((product, index) => 

                  <CartItem product={product} 
                  removeFromCart={()=>props.removeFromCart(product)} key={index}
                  />
                )

            } 

            <div className="full-cart-total">

              <div className="total-header" >

                  <h4>
                  <small>Total Amount: </small>
                  <span className="float-right text-primary">${props.total}</span>
                  </h4>

                </div>
             
                <div className="cart-btn-ctn" >
            
                  <div  className="full-cart-button">      
                   
                    <button onClick={ props.checkout} className="btn btn-success float-right">Checkout </button>
                    
                  </div>

                  <div  className="full-cart-button" >
                    <button className="btn btn-danger float-right" onClick={props.clearCart} >Clear Cart</button>
                  </div>
                 
                </div>
            </div>
          </div>
        </div>
      </div>
    )
}