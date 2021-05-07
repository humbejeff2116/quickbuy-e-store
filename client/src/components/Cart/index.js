
import React from 'react';
import { Cart } from './cart';
import { validateToken } from '../../services/ecormerce.service';
import MyContext from '../Context/context';



export default function AppCart() {
    const [err, setErr] = React.useState('');
    const [redirect, setRedirect] = React.useState('');
  
    const checkout = () => {
        const token = localStorage.getItem('x-access-token');
        const accessTokenExpirationTime = localStorage.getItem('x-access-token-expiration');
        if (!token ) {
            localStorage.setItem('checkout-message','please log in to complete action');
            localStorage.setItem('checkoutRoute', '/checkout');
            return setRedirect('/login');
              
        }
        if (token && (accessTokenExpirationTime < Date.now())) {
            localStorage.setItem('checkout-message','please log in to complete action');
            localStorage.setItem('checkoutRoute', '/checkout');
            return setRedirect('/login');   
        } 
        validateToken(token)
        .then(res =>  res.data)
        .then(token => {
            return setRedirect('/checkout');    
        })
        .catch( err => {
            console.error(err);
            setErr('an error occured will verifying token please try again');
        });
    }
    const hideModal = () => {
        setErr('');
    }
    return(
        <MyContext.Consumer>
      {context => (
           <Cart 
           products={context.cartProducts}
           redirect={redirect}
           removeFromCart={context.removeFromCart} 
           total={context.cartTotalSum} 
           checkout={checkout}
           clearCart={context.clearCart}
           hideModal={hideModal}
           err={err}
           reduceQuantity={context.reduceQuantity}
           addQuantity={context.addQuantity} 
           />
      )}
    </MyContext.Consumer>
    )
}