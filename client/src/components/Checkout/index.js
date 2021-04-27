

import React,{ useState, useEffect } from 'react';
import MyContext from '../Context/context';
import RequireAuthentication from '../AuthHoc/authenticate';
import { isAuthenticated } from '../../services/ecormerce.service';
import config from '../../config/config';
import { CheckoutComponent } from './checkout';



 function Checkout() {
    const [checkout, setCheckout] = useState(false);
    const [err, setErr] = useState('');
    const [redirect, setRedirect] = useState('');
    const [currency] = useState('USD');
    const [env] = useState(config.paypal.env);
    const [client] = useState(config.paypal.paypalClient);
  
    useEffect(()=> {
      window.scrollTo(0,0);
    })

     const toggleCheckout = ( ) => {
          return setCheckout(prevState => !prevState )
     }
      	
     const onCancel = (data) => {
          console.log('You have cancelled your payment', data);
     }

     const onError = (error) => {
          //TODO remove console.error
         console.error("an Error! occured while carrying out transaction", error);
         setErr('an error occured while carrying out transaction.');
          // TODO change alert to a custom react pop up modal component
         alert(err);	 
     }

     const cancelPayment = ( ) => {
      return setRedirect('/')
     }
    
     return(
        <MyContext.Consumer>
        {context => (
             <CheckoutComponent 
             title={'Checkout'}
             products={context.cartProducts}
             redirect={redirect}
             checkoutTotalSum={context.cartTotalSum}
             checkout={checkout}
             env={env}
             client={client}
             currency={currency}
             total={context.cartTotalSum}
             onError={onError}
             onSuccess={context.onSuccess}
             onCancel={onCancel}
             toggleCheckout={toggleCheckout}
             cancelPayment={cancelPayment}
             />
        )}
      </MyContext.Consumer>

     )
}
const AppCheckout = RequireAuthentication(Checkout , isAuthenticated);
export default AppCheckout;