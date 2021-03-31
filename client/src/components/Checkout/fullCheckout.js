






import React from 'react';
import {PageTemplate} from '../PageTemplate/pageTemplate'
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import CheckoutItem from './checkoutItem';
import CheckoutTotalSum from './checkouTotalSum';
import CheckoutButton from './checkoutButton';






export default function FullCheckout(props) {
    return (
        <PageTemplate>           
        <ErrorBoundary>
          <div className=" checkout-container">
            <div className="checkout">
              <div  className="checkout-title">
                <h3>{props.title}</h3>
              </div>
              {
                props.products.map((product, i) => 
                <CheckoutItem key={i} {...product} />
              )
              }
              <CheckoutTotalSum checkoutTotalSum={props.checkoutTotalSum} />
              <div>
              {
                (props.checkout) &&   (
                <PaypalExpressBtn 
                  env={props.env} 
                  client={props.client}
                  currency={props.currency} 
                  total={Number(props.total)} 
                  onError={props.onError} 
                  onSuccess={props.onSuccess} 
                  onCancel={props.onCancel}
                  style = {{
                    size: 'large',
                    color: 'blue'
                  }} 
                  />                                              
                )
              }
              </div>
              <CheckoutButton toggleCheckout={props.toggleCheckout} cancelPayment={props.cancelPayment}/>
            </div>
          </div>
        </ErrorBoundary>
        </PageTemplate> 
      );
}