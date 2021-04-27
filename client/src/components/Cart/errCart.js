
import React from 'react';
import CartTemplate from './cartTemplate';


export default function ErrCart(props) {
    return(
        <CartTemplate>
            <div>
                <p>{props.err}</p>
            </div>
            <button onClick={props.getCart} >refresh cart</button>
        </CartTemplate> 
    )
}