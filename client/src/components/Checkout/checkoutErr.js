
import React  from 'react';
import {PageTemplate} from '../PageTemplate/pageTemplate';
import  ErrorBoundary  from '../ErrorBoundary/errorBoundary';




export default function CheckoutErr(props) {
    return(
        <PageTemplate>            
        <ErrorBoundary>
            <div>
            <p>{props.err}</p>
            </div>
        </ErrorBoundary> 
        </PageTemplate>
    )
}