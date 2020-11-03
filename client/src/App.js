











import React from 'react'
import './App.css';
import {  Route,Switch,Redirect } from 'react-router-dom';
// import ErrorBoundary from './components/ErrorBoundary/errorBoundary'
import { isAuthenticated } from './services/ecormerce.service';
import HomePage from './components/Home/home';
import Login from './components/Login/login';
import Signup from './components/SignupPage/signup';

// import Signup from './components/SignupPage/signup'
import AppCart from './components/Cart/cart';
import Checkout from './components/Checkout/checkout';

import {ContactPage} from './components/ContactPage/contact'
import {SellProductPage} from './components/SellProductPage/sellProductPage'
import AccessoriesPage from './components/AccessoriesPage/accessoriesPage'
import JewelriesPage from './components/JewelriesPage/jewelriesPage'
import {AdvertisePage} from './components/AdvertisePage/advertise'
import {View} from './components/ViewItemPage/view'
import {DashboardPage} from './components/Dashboard/index'
import Woops404 from './components/404/woops404'
import {PageTemplate} from './components/PageTemplate/pageTemplate'


import  PopularCollectionsPage  from './components/PopularCollectionPage/popularCollectionPage';
import  LatestDealsPage  from './components/LatestDealsPage/latestDealsPage';
import  WomenCollectionsPage from './components/WomenCollectionPage/womenCollectionPage';
import MenCollectionsPage from './components/MenCollectionPage/menCollectionPage'








export default function App(){
 
    const auth = isAuthenticated();
    // const auth = true;
    return(
        <>
      
        <div className="container" >
        <Switch>            
            <Route exact  path="/" >
                <HomePage />
            </Route>
            <Route exact path="/popular-collections" >
                <PopularCollectionsPage/>
            </Route>

            <Route exact path="/women-collections"  >
                <WomenCollectionsPage/>
            </Route>

            <Route exact path="/men-collections"  >
                <MenCollectionsPage/>
            </Route>
                
            <Route exact  path="/latest-deals"  >
                <LatestDealsPage/>
            </Route>
                 
            <Route exact path="/cart" >
                <AppCart/>
            </Route>

            <Route exact path="/checkout"  >
                <Checkout/>
            </Route>

           
            <Route exact path="/jewelries"  >
                <JewelriesPage/>
            </Route>

            <Route exact path="/accessories"  >
                <AccessoriesPage/>
            </Route>

            <Route exact path="/contact"  >
                <ContactPage/>
            </Route>

            <Route exact path="/sell-Product" >
                <SellProductPage/>
            </Route>

            <Route exact path="/advertise"  >
                <AdvertisePage/>
            </Route>

            <Route exact path="/view-item"  >
                <View/>
            </Route>
          
             
           <Route exact path="/login" >
                <Login/>
            </Route>
            <Route exact path="/signup" component={Signup}/>
            <Route  path="/users/dashboard"  >
                    <DashboardPage/>
                </Route>
           
            <Route path="*">
            <Woops404 />
            </Route>
                         
            
           
            
         
            {/* <Route component={Woops404} /> */}          
        </Switch> 
            </div>
          
            </>               
         


    )
} 



   