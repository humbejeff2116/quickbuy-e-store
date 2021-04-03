
import React from 'react';
import {Redirect, useLocation } from 'react-router-dom';
import { getCartProducts,validateToken } from '../../services/ecormerce.service';
import CartLoader from './cartLoader';
import EmptyCart from './emptyCart';
import FullCart from  './fullCart';
import ErrCart from './errCart';
import './cart.css'
import './fullcart.css'




export default class AppCart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        products: [], 
        err:'',
        loading:false,
        cartTotalSum: 0,
        redirect:'' 
      }
  }

  componentDidMount() {
    this.getCart();
  }
 
  getCart = ( ) => {
    const cart = localStorage.getItem('cart');
    let cart1; 
    

    window.scrollTo(0,0);
    this.setState({ loading:true })
    if (!cart){
      this.setState({ loading:false });
      return; 
    }
    getCartProducts(cart)
    .then(response => response.data )
    .then(products => {
     
      let cart2 = {
        '7':2,
        '8':3,
        '6':2
      }
    // TODO...use cart1 later on just testing with cart2 
      cart1 = JSON.parse(cart);
      for(let i = 0; i < products.data.length; i++) {  
          products.data[i].qty = cart2[products.data[i].id];
          // products.data[i].productTotal = cart2[products.data[i].id] * products.data[i].price; 
      } 
      const cartProducts = products.data;
      let cartSum = 0;
      let cartTotalQty = 0;
      let cartTotalSum;
      for (let i = 0; i < cartProducts.length; i++) {     
        cartSum += cartProducts[i].price * cartProducts[i].qty;   
        cartTotalSum = cartSum.toFixed(2);
        cartTotalQty += cartProducts[i].qty;
      }
      localStorage.setItem('cartProducts',JSON.stringify(cartProducts))
      return this.setState({
        loading:false,
         products:cartProducts,
         cartTotalSum,
          err:'' 
      });
    }).catch(err => {
        console.error(err);
        this.setState({
          loading:false,
          err:'an error occured will getting data please wait and refresh'  
        });
      })
  }

  removeFromCart = (product) => {
    let cartProducts = this.state.products.filter(item => item.id !== product.id);
    let cart = JSON.parse(localStorage.getItem('cart'));
    let cartSum = this.state.cartTotalSum - (product.qty * product.price) ;
    let cartTotalSum = cartSum.toFixed(2);
    delete cart[product.id.toString()];
    localStorage.setItem('cart', JSON.stringify(cart));
    return this.setState({
      products: cartProducts, 
     cartTotalSum
    });
  }

  clearCart = ( ) => {
    localStorage.removeItem('cart');
    return this.setState({
      products: [],
      cartTotalSum:0
    });
  }

  checkout = ( ) => {
    const token = localStorage.getItem('x-access-token');
    const accessTokenExpirationTime = localStorage.getItem('x-access-token-expiration');
    if (!token ){
      localStorage.setItem('checkout-message','please log in to complete action');
      return this.setState({ redirect:'/login' })   
    }
    if(token && (accessTokenExpirationTime < Date.now())){
      localStorage.setItem('checkout-message','please log in to complete action');
      return this.setState({ redirect:'/login' })   

    }

    validateToken(token)
     .then(res =>  res.data )
     .then(token => {
      return this.setState({  redirect:'/checkout' })    
     })
     .catch( err => {
        console.error(err);
        this.setState({
          err:'an error occured will verifying token please try again'  
        });
     });
  }
  hideModal = () => {
    this.setState({
      err: false,
      

    })

  }
  addQuantity = (id) => {
    const products = this.state.products;
    let cartSum = 0;
    let cartTotalQty = 0;
    let cartTotalSum;
    for(let i = 0; i < products.length; i++) {
      if(products[i].id === id) {
        products[i].qty += 1;
         
      }
      cartSum += products[i].price * products[i].qty;   
      cartTotalSum = cartSum.toFixed(2);
      cartTotalQty += products[i].qty;
    }
    const cartProducts= JSON.parse(localStorage.getItem('cartProducts'));
    localStorage.removeItem('cartProducts');
    localStorage.setItem('cartProducts',JSON.stringify(cartProducts))
    return this.setState({
      products, 
      cartTotalSum,
    })
    
 
  }
  // TODOS... 
  reduceQuantity = (id) => {
    const products = this.state.products;
    let cartSum = 0;
    let cartTotalQty = 0;
    let cartTotalSum;
    for(let i = 0; i < products.length; i++) {
      if(products[i].id === id) {
        if(products[i].qty < 2) {
          return;
        }
        products[i].qty -= 1;    
      }
      cartSum += products[i].price * products[i].qty;   
      cartTotalSum = cartSum.toFixed(2);
      cartTotalQty += products[i].qty;
    }
    const cartProducts= JSON.parse(localStorage.getItem('cartProducts'));
    localStorage.removeItem('cartProducts');
    localStorage.setItem('cartProducts',JSON.stringify(cartProducts))
    return this.setState({
      products, 
      cartTotalSum,
    })
  }
  quantity=( )=>{

  }
  handleChange= ( ) =>{

  }

  render() {
    const { products, cartTotalSum, redirect, err, loading } = this.state;

    if(redirect) {
      return(
        <Redirect to={redirect} />
      )
    }

    if(loading) {
      return(
          <CartLoader/>   
      )
    }

    if(err) {
      return( 
          <ErrCart 
          err={err}
          getCart={this.getCart}
          />
      )
    }

    if(products.length <  1 && !err) {
      return(
          <EmptyCart getCart={this.getCart} />           
      )
    }

    return (
          <FullCart 
          products={products} 
          removeFromCart={this.removeFromCart} 
          total={cartTotalSum} 
          checkout={this.checkout}
          clearCart={this.clearCart}
          hideModal={this.hideModal}
          err={err}
          reduceQuantity={this.reduceQuantity}
          addQuantity={this.addQuantity}
          quantity={this.quantity}
          handleChange={this.handleChange}   
          />    
    );
  }
}