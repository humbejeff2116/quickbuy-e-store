














import React from 'react';


import {Header} from '../Header/index';


// import { Article } from '../Article/index';
// import { Banner } from '../Banner/banner';
import { Footer } from './DashboardFooter/index';
import { MobileSearch }   from '../Slider/index';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import SideNav from './sidenav';



export const DashboardTemplate = ({children})=>
    <>
    <ErrorBoundary>
    <Header/>
    </ErrorBoundary>
    <div className="dashboard-container" id="dashboard-container">
    <MobileSearch />
    <SideNav />
    {children}                 
     {/* < Banner />                    */}
    {/* // single 6 divs collection goes here */}
                    
    {/* // collection goes here */}
                      
    </div>
     {/* footer goes here */}
     <ErrorBoundary>
    <Footer  />
    </ErrorBoundary>
    </>

