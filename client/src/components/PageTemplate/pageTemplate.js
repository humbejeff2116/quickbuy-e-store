





import React from 'react'


import {Header} from '../Header/index'


// import { Article } from '../Article/index';
import { Banner } from '../Banner/banner';
import { Footer } from '../Footer/index';
import { MobileSearch }   from '../Slider/index';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'


export const PageTemplate = ({children})=>
    <>
    <ErrorBoundary>
    <Header/>
    </ErrorBoundary>
    <div className="main-container" id="main-container">
    <MobileSearch />
    {children}                 
     < Banner />                   
    {/* // single 6 divs collection goes here */}
                    
    {/* // collection goes here */}
                      
    </div>
     {/* footer goes here */}
     <ErrorBoundary>
    <Footer  />
    </ErrorBoundary>
    </>

