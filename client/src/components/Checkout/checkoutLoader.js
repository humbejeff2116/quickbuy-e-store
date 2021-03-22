



import React from 'react';
import {PageTemplate} from '../PageTemplate/pageTemplate';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { Loader } from '../Loader/loader';





export default function CheckoutLoader(props) {
    return(
        <PageTemplate>                     
        <ErrorBoundary>
          <Loader/>   
        </ErrorBoundary> 
        </PageTemplate>

    )
}