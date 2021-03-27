


import React from 'react';
import { isAuthenticated, getCartProducts, postOrders } from '../../services/ecormerce.service';
import { Redirect } from 'react-router-dom';
import RequireAuthentication from '../AuthHoc/authenticate';
import CheckoutLoader from './checkoutLoader';
import CheckoutErr from './checkoutErr';
import FullCheckout from './fullCheckout';
import EmptyCart from './emptyCheckout';
import config from '../../config/config';
import './checkout.css';


 class CheckoutComp extends React.Component {
    constructor(props) {
    super(props);
      this.state = {
        products: [],
        checkout: false,
        err: '',
        redirect:'',
        currency: 'USD',   
        loading: false,
        checkoutTotalSum: 0, 
        showButton: false,      
        env: config.paypal.env,
        client: config.paypal.paypalClient
      }
    }
  componentDidMount() {
  this.getCart();
  }
  getCart = ( ) => {
    window.scrollTo(0,0);
    const cart = localStorage.getItem('cart');
    this.setState({ loading: true });
    if (!cart) {
      this.setState({ loading: false });
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
      cart1 = JSON.parse(cart);
      for(let i = 0; i < products.data.length; i++) {  
          products.data[i].qty = cart2[products.data[i].id];
      } 
      const checkoutProducts = products.data;
      let cart1; 
      let checkoutSum = 0;
      let checkoutTotalQty = 0;
      let checkoutTotalSum;
      for (let i = 0; i < cartProducts.length; i++) {     
        checkoutSum += cartProducts[i].price * cartProducts[i].qty;   
        checkoutTotalSum = cartSum.toFixed(2);
        checkoutTotalQty += cartProducts[i].qty;
      }
      return this.setState({
        loading:false,
         products:checkoutProducts,
         checkoutTotalSum,
          err:'' 
      });
    }).catch(err => {
        console.error(err);
        this.setState({
          loading:false,
          err:'an error occured will getting data please wait and refresh'  
        });
    });
  }
  
   toggleCheckout = ( ) => {
     this.setState(prevState => ({
       checkout: !prevState.checkout
     }));
   }
   
   onSuccess = (payment) => {
    const user = localStorage.getItem('user');
    const products = this.state.products;
    const checkoutTotalSum = this.state.checkoutTotalSum;
    console.log("Your payment has been made successful!", payment);
    postOrders(payment, user, products, checkoutTotalSum )
    .then(response => console.log('orders posted successfully') )
    .catch(err => console.error(err));
  }	
   onCancel = (data) => {
      console.log('You have cancelled your payment', data);
  }	        
  onError = (err) => {
      console.log("an Error! occured while carrying out transaction", err);	 
  }
  cancelPayment = ( ) => {
    this.setState({
      redirect: '/'
    })
  } 

  render() {
    const { products, checkoutTotalSum, loading,err,redirect, env, client, currency} =  this.state;
    if(redirect) {
      return(
        <Redirect to={redirect}/>
      )
    }
          
    if(loading) {
      return(
        <CheckoutLoader/>
      )
    }

    if(err) {
      return(
        <CheckoutErr err={err}/>
      )
    }

    if(!products.length ) {
      return(       
        <EmptyCart />
      )      
    } 
    return (
      <FullCheckout 
      title={'Checkout'}
      products={products}
      checkoutTotalSum={checkoutTotalSum}
      env={env}
      client={client}
      currency={currency}
      total={checkoutTotalSum}
      onError={this.onError}
      onSuccess={this.onSuccess}
      onCancel={this.onCancel}
      toggleCheckout={this.toggleCheckout}
      cancelPayment={this.cancelPayment}
      />
    );
  }
}
 const Checkout = RequireAuthentication(CheckoutComp , isAuthenticated);
 export default Checkout;

// on success will return this object then send the details to the backend 
// onSuccess={
//   paid: true,
//   cancelled: false, 
//   payerID: 'H8S4CU73PFRAG',
//   paymentID: 'PAY-85JK825PA3216TLESPCDA',
//   paymentToken: 'EC-8JN5188N284574L',
//   returnUrl: 'https://www.sandbox.paypal.com/?pay8JN5188N284574L&PayerID=K44CU73PFTGH'
// }
