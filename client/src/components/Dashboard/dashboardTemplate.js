import React from 'react';
import {Header} from '../Header/index';
import { Footer } from '../Footer/index';
import { MobileSearch }   from '../Slider/index';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import SideNav from './sidenav';



export const DashboardTemplate = ({children}) =>
    <>
    <ErrorBoundary>
        <Header/>
    </ErrorBoundary>
    <div className="dashboard-container" id="dashboard-container">
        <MobileSearch />
        <SideNav />
        {children}                              
    </div>
     <ErrorBoundary>
        <Footer className='dashboard-footer'  />
    </ErrorBoundary>
    </>