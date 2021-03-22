



import React from 'react';

export default function ViewAddButton(props) {
    return(
        <>
        <div className="view-qty">
            <button onClick={()=>props.setQuantity(prevState => prevState - 1)}> reduce </button>
            <input type="number" value={props.quantity} name="quantity" 
            onChange={props.handleInputChange} className="float-right"  
            />
            <button onClick={()=>props.setQuantity(prevState => prevState + 1)}> add </button>
        </div>
        <div className="view-add-to-cart">
            <button onClick={()=>props.addToCart(props.id.toString())}> <i>{props.cartIcon}</i>Add to cart</button>
        </div>
        </>
    )
}