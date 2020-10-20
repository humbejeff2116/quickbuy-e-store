





















import React from 'react';


// Let's create the CartItem component which will be used to render each product on the cart.
// This component uses the remove method provided as a prop to remove the item from the cart completely.
//  The remove method is provided by the parent Cart component which we will be creating next.

 class CartItem extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      
        quantity: 1

    }

  }

  render(){

    const { product } = this.props;

    return (
    

      <div className="card" style={{ marginBottom: "10px"}}>

        <div className="card-body">

          <h4 className="card-title">{product.name}</h4>

          <h5 className="card-text"><small>price: </small>${product.price}</h5>

          <span className="card-text text-success">

              <small>Quantity: </small>{product.qty}</span>

          <button className="btn btn-sm btn-warning float-right" 

              onClick={( ) => this.props.removeFromCart(product)}>Remove from cart</button>

        </div>

      </div>
     

     )

  }

}




export default CartItem