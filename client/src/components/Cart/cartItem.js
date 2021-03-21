
import React from 'react';


 class CartItem extends React.Component {

  constructor(props) {  
    super(props);
    this.state = {
        quantity: 1
    }
  }

  render() {
    const { product } = this.props;
    return (
      <div className="card" >
        <div className="card-body">
          <p className="card-title">Name: {product.name}</p>
          <p className="card-text">Price: ${product.price}</p>
          <p className="card-text ">Quantity: {product.qty}</p>
          <button className="btn btn-sm btn-warning float-right" 
          onClick={()=>this.props.removeFromCart(product)}
          >
            Remove from cart
          </button>
        </div>
      </div>
     )
  }
}
export default CartItem