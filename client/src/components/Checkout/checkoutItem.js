




import React from 'react'





export default function CheckoutItem(props) {
    return(
        <div className="checkout-container" >
            <div className="checckout-panel">
                <div className="checkout-item-image">
                    <image src={props.src} width="80%" height="80%" />
                </div>
                <div  className="checkout-product" >
                    <span className="text-primary">product name:<span className="checkout-data"> {props.name}</span> </span>
                    <span className="text-primary">price per 1: ${props.price}</span><br />
                    <span className="text-primary"> quantity: {props.qty}</span><br />
                    <span className=" text-primary">product amount: ${props.qty * props.price} </span>
                </div>
            </div>
      </div>
    )
}

