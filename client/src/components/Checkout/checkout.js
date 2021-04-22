
import React from 'react';
import { Redirect } from 'react-router-dom';
import FullCheckout from './fullCheckout';
import EmptyCart from './emptyCheckout';
import './checkout.css';

export function CheckoutComponent(props) {
  if (props.redirect) {
    return(
      <Redirect to={props.redirect}/>
    )
  }
  if (!props.products.length ) { 
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

//TODO... on success will return this object then send the details to the backend 
// onSuccess={
//   paid: true,
//   cancelled: false, 
//   payerID: 'H8S4CU73PFRAG',
//   paymentID: 'PAY-85JK825PA3216TLESPCDA',
//   paymentToken: 'EC-8JN5188N284574L',
//   returnUrl: 'https://www.sandbox.paypal.com/?pay8JN5188N284574L&PayerID=K44CU73PFTGH'
// }
