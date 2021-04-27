
import React from 'react';
import { Redirect } from 'react-router-dom';
import CartLoader from './cartLoader';
import EmptyCart from './emptyCart';
import FullCart from  './fullCart';
import './cart.css';
import './fullcart.css';


export function Cart (props) {
  if (props.redirect) {
    return(
      <Redirect to={props.redirect} />
    )
  }
  if (props.loading) {
    return(
      <CartLoader/>   
    )
  }
  if (props.products.length <  1 && !props.err) {
    return(
      <EmptyCart/>           
    )
  }
  return (
    <FullCart 
    products={props.products} 
    removeFromCart={props.removeFromCart} 
    total={props.total} 
    checkout={props.checkout}
    clearCart={props.clearCart}
    hideModal={props.hideModal}
    err={props.err}
    reduceQuantity={props.reduceQuantity}
    addQuantity={props.addQuantity} 
    />  
  )  
}