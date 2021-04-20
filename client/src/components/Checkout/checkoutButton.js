
import React  from 'react';


export default function CheckoutButton(props) {
    return (
        <div className="checkout-btn" >
            <div className="full-checkout-button">
            <button  onClick={()=>props.toggleCheckout()}>
                Pay
            </button>
            </div>
           <div className="full-checkout-button">
           <button onClick={()=>props.cancelPayment()} >
                Cancel
            </button>
           </div>
            
        </div>
    )
}