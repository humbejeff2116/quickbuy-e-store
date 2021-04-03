








import React from 'react';




export default function CheckoutTotalSum(props) {
    return(
        <div className="checkout-total" >
        <p>
        <span > Total Amount:</span> ${props.checkoutTotalSum } 
      </p>
      </div>
    )
}