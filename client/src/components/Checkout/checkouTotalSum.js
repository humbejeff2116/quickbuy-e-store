








import React from 'react';




export default function CheckoutTotalSum(props) {
    return(
        <div className="checkout-total" >
        <h4>
          Total Amount: <span className="float-right text-primary">${props.checkoutTotalSum } </span>
      </h4>
      </div>
    )
}