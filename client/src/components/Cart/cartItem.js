
import React from 'react';

import azz_black from '../../images/azz_black_xl.webp';




function CartItem(props){
  const { product } = props;
  return(
   
    <div className="card" >
        <div className="card-body">
          <div className="card-item-image">
            <img src={azz_black } width="100%" height="100%" />
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