




import React from 'react'





export default function CheckoutItem(props) {
    return(
        <div className="checkout-item-container" >
            <div className="checkout-item-panel">
                <div className="checkout-item-image">
                    <image src={props.src} width="80%" height="80%" />
                </div>
                <div  className="checkout-product" >
                    <p className="text-primary"><span>product name:</span> {props.name}</p>
                    <p className="text-primary"><span>price per 1:</span> ${props.price}</p><br />
                    <p className="text-primary"><span>quantity:</span> {props.qty}</p><br />
                    <p className=" text-primary"><span>product amount:</span> ${props.qty * props.price} </p>
                </div>
            </div>
      </div>
    )
}

