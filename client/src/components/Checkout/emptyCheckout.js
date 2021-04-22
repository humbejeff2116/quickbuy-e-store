

import React from 'react';
import {PageTemplate} from '../PageTemplate/pageTemplate';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';

export default function EmptyCart(props) {
    return(       
        <PageTemplate>                     
        <ErrorBoundary>
          <div className=" checkout-container">
            <h3 className="checkOut-title">Checkout</h3><hr/>
            <h3 className="text-warning">it seems you dont have any item in your  cart</h3>
          </div>
        </ErrorBoundary> 
        </PageTemplate>

      )     
}