
import React from 'react';
import {PageTemplate} from '../PageTemplate/pageTemplate'
import ErrorBoundary from '../ErrorBoundary/errorBoundary';



export default function CartTemplate(props) {
    return(
        <PageTemplate>
        <ErrorBoundary>   
          {props.children}
        </ErrorBoundary>
      </PageTemplate>   
    )
}