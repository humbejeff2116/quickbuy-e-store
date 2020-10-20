









import React from 'react';
import shopping_cart_PNG60 from '../../images/shopping_cart_PNG65.png'

import { Link } from 'react-router-dom';

import { getCartProducts } from '../../services/ecormerce.service';

import CartItem from './cartItem';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';

import { PageLoader } from '../Loader/loader';
import {PageTemplate} from '../PageTemplate/pageTemplate'
// import {Header} from '../Header/index'
import './cart.css'



// create the cart component

// The removeFromCart method in this component is passed to the CartItem component.
//  It deletes the product from the cart on the localStorage and removes the product 
// from the list products to be rendered. The Cart component also provides a clearCart method which 
// removes all the items on the cart
// this is done by deleting the cart from the localStorage).

export default class AppCart extends React.Component {

  constructor(props) {

    super(props);

    this.state = { 
        products: [], 
        loading:false,
        total: 0 
      }

  }

  componentDidMount() {
      window.scrollTo(0,0);
    this.setState({
      loading:true
    })

    const cart = localStorage.getItem('cart');

    if (!cart){

      this.setState({

        loading:false
      });
      return; 

    }

    getCartProducts(cart)
    .then(response=> response.data)
    .then(products => {
      
      let sum = 0;
      let total;

      for (let i = 0; i < products.length; i++) {

        sum += products[i].price * products[i].qty;
        total = sum.toFixed(2);

      }

      this.setState({
        loading:false,
         products,
          total 
      });

      });

  }
  // componentDidUpdate(){
  //     window.scrollTo(0,0);
  // }

  removeFromCart = (product) => {

    let products = this.state.products.filter(item => item.id !== product.id);

    let cart = JSON.parse(localStorage.getItem('cart'));

    delete cart[product.id.toString()];

    localStorage.setItem('cart', JSON.stringify(cart));

    let sum = this.state.total - (product.qty * product.price) ;
    let total = sum.toFixed(2);

    this.setState({
      products, 
      total
    });

  }

  clearCart = () => {

    localStorage.removeItem('cart');

    this.setState({
      products: [],
      total:0
    });

  }


  render() {

    const { products, total } = this.state;

    if(!products.length){
      return(

      
         <PageTemplate>
           {/* <Header/> */}
        <ErrorBoundary> 
            { (this.state.loading) && (<PageLoader/>) }     
        <div className=" cart-container">
          <div className="cart-header">
          <h3 className="cart-title">Shopping Cart</h3> 
          </div>
          <div className="cart-body">
          <h3 className="cart-warning">No item in your cart</h3> 
         
          <div className="cart-img">
        <img width="200px" height="200px;" src={shopping_cart_PNG60} alt="logo" title="site logo" /> 
        </div> 
        <div className="cart-button">
        <button >Start Shoping </button> 
        </div>     
         
          </div>     
        </div>   
      
          </ErrorBoundary>
          </PageTemplate>     
        

      )

    }

    return (
    
      <PageTemplate>
      <ErrorBoundary>
          { (this.state.loading) && <PageLoader/> }

      <div className=" cart-container">

        <h3 className="cart-title">Cart</h3> <hr/>

        {

            products.map((product, index) => 

              <CartItem product={product} removeFromCart={this.removeFromCart} key={index}/>)

        } <hr/>

         <div>
           <h4>
          <small>Total Amount: </small>
          <span className="float-right text-primary">${total}</span>
          </h4>
          {/* <hr/> */}
          </div>

        <Link to="/checkout">
            <button className="btn btn-success float-right">Checkout</button>
        </Link>

        <button className="btn btn-danger float-right" onClick={this.clearCart} 
            style={{ marginRight: "10px" }} >Clear Cart</button><br/><br/><br/>
      </div>
      </ErrorBoundary>
      </PageTemplate>     
     

    );

  }

}

