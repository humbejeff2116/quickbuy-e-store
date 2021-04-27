
import React from 'react';

function CartItem(props) {
  const { product } = props;
  return(
    <div className="card" >
        <div className="card-body">
          <div className="card-item-image">
            <img src={product.src} alt="cart item" width="100%" height="100%" />
          </div>
          <div className="card-item-details">
            <div className="card-item-text" >
              <p className="card-title"><span>Name:</span> {product.name}</p>
              <p className="card-text"><span>Price:</span> ${product.price}</p>
              <p className="card-text "><span>Quantity:</span> {product.qty}</p>
              <p className="card-text "><span>Product amount:</span> ${product.qty * product.price}</p>
            </div>
            {/* TODO  */}
            <div className="card-add-button">
              <button onClick={()=>props.reduceQuantity(product.id)}> reduce </button>
              <button onClick={()=>props.addQuantity(product.id)}> add </button>
            </div>
            
            <div className="card-remove-button">
            <button  onClick={()=>props.removeFromCart(product)}>Remove from bag</button>
            </div>
           
          </div>
        </div>
      </div>

  )
}
export default CartItem;