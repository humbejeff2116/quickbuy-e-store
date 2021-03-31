




import React from 'react'





export default function CheckoutItem(props) {
    return(
        <div className="checkout-item-container" >
            <div className="checkout-item-panel">
                <div className="checkout-item-image">
                    <image src={props.src} width="80%" height="80%" />
                </div>
                <div  className="checkout-product" >
                    <p className="text-primary">product name:<span className="checkout-data"> {props.name}</span> </p>
                    <p className="text-primary">price per 1: ${props.price}</p><br />
                    <p className="text-primary"> quantity: {props.qty}</p><br />
                    <p className=" text-primary">product amount: ${props.qty * props.price} </p>
                </div>
            </div>
      </div>
    )
}

