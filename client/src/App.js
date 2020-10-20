











import React from 'react'
import './App.css';
import {  Route,Switch, } from 'react-router-dom';
// import ErrorBoundary from './components/ErrorBoundary/errorBoundary'
import { isAuthenticated } from './services/ecormerce.service';
import Home from './components/Home/home'
import LoginPage from './components/Login/index';
// import Signup from './components/SignupPage/signup'
import AppCart from './components/Cart/cart';
import Checkout from './components/Checkout/checkout';

import {ContactPage} from './components/ContactPage/contact'
import {SellProductPage} from './components/SellProductPage/sellProductPage'
import AccessoriesPage from './components/AccessoriesPage/accessoriesPage'
import JewelriesPage from './components/JewelriesPage/jewelriesPage'
import {AdvertisePage} from './components/AdvertisePage/advertise'
import {View} from './components/ViewItemPage/view'
import Woops404 from './components/404/woops404'
// import {PageTemplate} from './components/PageTemplate/pageTemplate'


import  PopularCollectionsPage  from './components/PopularCollectionPage/popularCollectionPage';
import  LatestDealsPage  from './components/LatestDealsPage/latestDealsPage';
import  WomenCollectionsPage from './components/WomenCollectionPage/womenCollectionPage';
import MenCollectionsPage from './components/MenCollectionPage/menCollectionPage'








export default function App(){
 
    const auth = isAuthenticated();
    return(
        <div>
      
        <div className="container" >
        <Switch>            
        <Route exact  path="/" >
                <Home />
               </Route>
               <Route  path="/popular-collections" >
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
                 
            <Route  path="/cart" >
            <AppCart/>
            </Route>

            <Route  path="/checkout"  >
                <Checkout/>
                </Route>

           
            <Route  path="/jewelries"  >
                <JewelriesPage/>
                </Route>

            <Route  path="/accessories"  >
                <AccessoriesPage/>
                </Route>

            <Route  path="/contact"  >
                <ContactPage/>
                </Route>

            <Route  path="/sell-Product" >
                <SellProductPage/>
                </Route>

            <Route  path="/advertise"  >
                <AdvertisePage/>
                </Route>

            <Route  path="/view-item"  >
                <View/>
                </Route>
             

            { (!auth) ? <> <Route  path="/login" >
                            <LoginPage/>
                            </Route>
                         
                        </>  
            : null 

            }
               <Route path="*">
            <Woops404 />
          </Route>
         
            {/* <Route component={Woops404} /> */}
           
           
            </Switch> 
            </div>
          
            </div>               
         


    )
} 

   