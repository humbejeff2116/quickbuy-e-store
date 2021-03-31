
import React from 'react';




function CartItem(props){
  const { product } = props;
  return(
   
    <div className="card" >
        <div className="card-body">
          <div className="card-item-image">
            <image src={product.src} width="80%" height="80%" />
          </div>
          <div className="card-item-details">
            <div className="card-item-text" >
            <p className="card-title">Name: {product.name}</p>
            <p className="card-text">Price: ${product.price}</p>
            <p className="card-text ">Quantity: {product.qty}</p>
            <p className="card-text ">Product amount: ${product.qty * product.price}</p>
            </div>
            
            <button className="btn btn-sm btn-warning float-right" 
            onClick={()=>props.removeFromCart(product)}
            >
              Remove from cart
            </button>
          </div>
        </div>
      </div>

  )
}
export default CartItem






//class CartItem extends React.Component {

  //   constructor(props) {  
  //     super(props);
  //     this.state = {
  //         quantity: 1
  //     }
  //   }
  
  //   render() {
  //     const { product } = this.props;
  //     return (
  //       <div className="card" >
  //         <div className="card-body">
  //           <div className="card-item-image">
  //             <image src={this.props.src} width="80%" height="80%" />
  //           </div>
  //           <div className="card-item-details">
  //             <p className="card-title">Name: {product.name}</p>
  //             <p className="card-text">Price: ${product.price}</p>
  //             <p className="card-text ">Quantity: {product.qty}</p>
  //             {
  //               product.productTotal ?  <p className="card-text ">Quantity: {product.productTotal}</p>: ''
              
  //             }
  //             <button className="btn btn-sm btn-warning float-right" 
  //             onClick={()=>this.props.removeFromCart(product)}
  //             >
  //               Remove from cart
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //      )
  //   }
  // }