
import React from 'react';
import { Header } from '../Header/index';
import { Footer } from '../Footer/index';
import { MobileSearch }   from '../Slider/index';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';


export const PageTemplate = ({children}) =>
    <>
    <ErrorBoundary>
    <Header/>
    </ErrorBoundary>
    <div className="main-container" id="main-container">
    <MobileSearch />
    {children}                                  
    </div>
     <ErrorBoundary>
    <Footer  />
    </ErrorBoundary>
    </>