


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

export function CheckoutComponent(props) {
 

 if(props.redirect) {
  return(
    <Redirect to={props.redirect}/>
  )
}
      

if(!props.products.length ) { 
  return(       
    <EmptyCart />
  )      
} 
return (
  <FullCheckout 
  title={'Checkout'}
  products={props.products}
  checkoutTotalSum={props.checkoutTotalSum}
  checkout={props.checkout}
  env={props.env}
  client={props.client}
  currency={props.currency}
  total={props.checkoutTotalSum}
  onError={props.onError}
  onSuccess={props.onSuccess}
  onCancel={props.onCancel}
  toggleCheckout={props.toggleCheckout}
  cancelPayment={props.cancelPayment}
  />
);

}
//  class CheckoutComp extends React.Component {
//     constructor(props) {
//     super(props);
//       this.state = {
//         products: [],
//         checkout: false,
//         err: '',
//         redirect:'',
//         currency: 'USD',   
//         loading: false,
         
//         showButton: false,      
//         env: config.paypal.env,
//         client: config.paypal.paypalClient
//       }
//     }
//   componentDidMount() {
//     window.scrollTo(0,0);
 
//   }

//    toggleCheckout = ( ) => {
//      this.setState(prevState => ({
//        checkout: !prevState.checkout
//      }));
//    }
   
//    onSuccess = (payment) => {
//     const user = localStorage.getItem('user');
//     const products = this.state.products;
//     const checkoutTotalSum = this.state.checkoutTotalSum;
//     console.log("Your payment has been made successful!", payment);
//     postOrders(payment, user, products, checkoutTotalSum )
//     .then(response => console.log('orders posted successfully') )
//     .catch(err => console.error(err));
//   }	
//    onCancel = (data) => {
//       console.log('You have cancelled your payment', data);
//   }	        
//   onError = (err) => {
//       console.log("an Error! occured while carrying out transaction", err);	 
//   }
//   cancelPayment = ( ) => {
//     this.setState({
//       redirect: '/'
//     })
//   } 

//   render() {
//     const {  loading,err,redirect, env, client, currency,checkout} =  this.state;
   
//     if(redirect) {
//       return(
//         <Redirect to={redirect}/>
//       )
//     }
          
//     if(loading) {
//       return(
//         <CheckoutLoader/>
//       )
//     }

//     if(err) {
//       return(
//         <CheckoutErr err={err}/>
//       )
//     }

//     if(!products.length ) {
//       return(       
//         <EmptyCart />
//       )      
//     } 
//     return (
//       <FullCheckout 
//       title={'Checkout'}
//       products={products}
//       checkoutTotalSum={checkoutTotalSum}
//       checkout={checkout}
//       env={env}
//       client={client}
//       currency={currency}
//       total={checkoutTotalSum}
//       onError={this.onError}
//       onSuccess={this.onSuccess}
//       onCancel={this.onCancel}
//       toggleCheckout={this.toggleCheckout}
//       cancelPayment={this.cancelPayment}
//       />
//     );
//   }
// }
//  const Checkout = RequireAuthentication(CheckoutComp , isAuthenticated);
//  export default Checkout;

// on success will return this object then send the details to the backend 
// onSuccess={
//   paid: true,
//   cancelled: false, 
//   payerID: 'H8S4CU73PFRAG',
//   paymentID: 'PAY-85JK825PA3216TLESPCDA',
//   paymentToken: 'EC-8JN5188N284574L',
//   returnUrl: 'https://www.sandbox.paypal.com/?pay8JN5188N284574L&PayerID=K44CU73PFTGH'
// }
