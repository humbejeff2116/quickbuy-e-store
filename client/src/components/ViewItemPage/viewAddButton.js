



import React from 'react';

export default function ViewAddButton(props) {
    return(
        <>
           <h4>quantity</h4>
        <div className="view-add-section" >
            <div className="view-quantity">
            <div className="view-add-qty">    
            
                <button onClick={()=>props.setQuantity(prevState => prevState - 1)}> reduce </button>
                <input type="number" value={props.quantity} name="quantity" 
                onChange={props.handleInputChange} className="float-right"  
                />
                <button onClick={()=>props.setQuantity(prevState => prevState + 1)}> add </button>
            </div>

            </div> 
        <div className="view-add-to-cart">
            <button onClick={()=>props.addToCart(
                props.id.toString(), 
                props.src, props.name, 
                props.price,props.setErr, 
                props.setErrMssg, props.setMssg, 
                props.setCartMssg,
                props.quantity,
                props.size
                )}
                > 
                    <i>{props.cartIcon}</i>
                    Add to bag
                </button>
        </div>


        </div>
       
        </>
    )
}