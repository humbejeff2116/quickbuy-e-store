

import React from 'react';
import { PageTemplate } from '../PageTemplate/pageTemplate';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';
import { Loader2 } from '../Loader/loader';





export default function CheckoutLoader() {
    return(
        <PageTemplate>                     
        <ErrorBoundary>
          <Loader2/>   
        </ErrorBoundary> 
        </PageTemplate>

    )
}