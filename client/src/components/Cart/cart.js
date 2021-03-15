









import React from 'react';
import {Redirect, useLocation } from 'react-router-dom';
import { getCartProducts,validateToken } from '../../services/ecormerce.service';
import { Loader } from '../Loader/loader';
import EmptyCart from './emptyCart';
import FullCart from  './fullCart';
import './cart.css'
import './fullcart.css'
import CartTemplate from './cartTemplate';
import ErrCart from './errCart';




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
    window.scrollTo(0,0);
    this.setState({ loading:true })

    const cart = localStorage.getItem('cart');

    if (!cart){

      this.setState({ loading:false });
      return; 

    }

    getCartProducts(cart)
    .then(response => response.data )
    .then(products => {
      let cart2 = {
        '2':2,
        '3':3,
        '6':2
    }
    // use cart1 later on just testing with cart2 
     let cart1 = JSON.parse(cart);
    // loop and add the quantity of each product to the response data products
      for( let i = 0; i < products.data.length; i++ ) {  

          products.data[i].qty = cart2[products.data[i].id]; 

      }
      
      let cartSum = 0;
      let cartTotalQty = 0;
      let cartTotalSum;
      const cartProducts = products.data;

      for (let i = 0; i < cartProducts.length; i++) {

        cartSum += cartProducts[i].price * cartProducts[i].qty;   
        cartTotalSum = cartSum.toFixed(2);
        cartTotalQty += cartProducts[i].qty;

      }

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

  removeFromCart = ( product ) => {

    let cartProducts = this.state.products.filter(item => item.id !== product.id);

    let cart = JSON.parse(localStorage.getItem('cart'));
 

    delete cart[product.id.toString()];

    localStorage.setItem('cart', JSON.stringify(cart));

    let cartSum = this.state.cartTotalSum - (product.qty * product.price) ;
    let cartTotalSum = cartSum.toFixed(2);

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

    if (!token){

      localStorage.setItem('checkout-action','please log in to complete action');
      return this.setState({ redirect:'/login' })
      
    }
    //else if token validate token  before setting state
    validateToken(token)
     .then( res =>  res.data )
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


  render() {

    const { products, cartTotalSum, redirect, err, loading } = this.state;

    if( redirect ){

      return(
        <Redirect to={redirect} />
      )

    }

    if( loading ){

      return(

        <CartTemplate>
          <Loader/> 
        </CartTemplate>

      )
    }

    if( err ){

      return(
       
        <CartTemplate>
          <ErrCart 
          err={err}
          getCart={this.getCart}
          />
        </CartTemplate>
      )
    }

    if( products.length <  1 && !err ) {
      return(

       <CartTemplate>
          <EmptyCart getCart={this.getCart} />
        </CartTemplate>    
          
      )

    }

    return (
  
       <CartTemplate>
          <FullCart 
          products={products} 
          removeFromCart={this.removeFromCart} 
          total={cartTotalSum} 
          checkout={this.checkout}
          clearCart={this.clearCart}  
          />
        </CartTemplate>       
    );

  }

}