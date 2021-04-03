






import React from 'react'
import CartTemplate from './cartTemplate';
import CartItem from './cartItem';
import { AlertBox } from '../AlertBox/alertBox';



export default function FullCart(props) {
    return(
      <CartTemplate>
        <div className=" full-cart-container">
        {
                (props.err) && (
                    <AlertBox show = {props.err } handleClose={props.hideModal}>
                    <div className="modal-header">
                        <span className="close" onClick={props.hideModal}>&times;</span>
                    </div>
                    <div className="modal-content">
                        <p> {props.err} </p>
                        <p> Please wait and try again.</p>
                    </div>
                </AlertBox>


                )
            }

        <div className="full-cart">
          <div className="full-cart-header">
          <h2 className="full-cart-title">Cart</h2> 
          </div>
          <div className="full-cart-body" >           
            {
                props.products.map((product, i) => 
                  <CartItem 
                    key={i}
                    product={product} 
                    removeFromCart={props.removeFromCart} 
                   addQuantity={props.addQuantity}
                    reduceQuantity={props.reduceQuantity}
                    quantity={props.quantity}
                    handleChange={props.handleChange} 
                  />
                )
            } 
            <div className="full-cart-total">
              <div className="total-header" >
                  <p>
                  <span>Total Amount:</span> ${props.total}
                  </p>
                </div>           
                <div className="cart-btn-ctnr" >  
                  <div  className="full-cart-button">                        
                    <button onClick={ props.checkout} >Checkout </button>                    
                  </div>
                  <div  className="full-cart-button" >
                    <button className="clear-cart-btn" onClick={props.clearCart} >Clear Cart</button>
                  </div>                 
                </div>
            </div>
          </div>
        </div>
      </div>
    </CartTemplate>
    )
}