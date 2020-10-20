























import React from'react'
import { isAuthenticated } from '../services/ecormerce.service';
// import '../App.css';

import {  Route,Switch,Link } from 'react-router-dom';
import {Products} from '../components/Home/home'
import LoginPage from '../components/Login/index';
// import Signup from './components/SignupPage/signup'
import AppCart from '../components/Cart/cart';
import Checkout from '../components/Checkout/checkout';
// import  PopularCollectionsPage  from '../components/PopularCollectionPage/popularCollectionPage';
import  LatestDealsPage  from '../components/LatestDealsPage/latestDealsPage';
// import  WomenCollectionsPage from '../components/WomenCollectionPage/womenCollectionPage';
// import MenCollectionsPage from '../components/MenCollectionPage/menCollectionPage'
import {ContactPage} from '../components/ContactPage/contact'
import {SellProductPage} from '../components/SellProductPage/sellProductPage'
// import AccessoriesPage from '../components/AccessoriesPage/accessoriesPage'
// import JewelriesPage from '../components/JewelriesPage/jewelriesPage'
// import {AdvertisePage} from '../components/AdvertisePage/advertise'
// import {View} from '../components/ViewItemPage/view'
import Woops404 from '../components/404/woops404'
// import {PageTemplate} from '../components/PageTemplate/pageTemplate'








export default function App(){
    const auth = isAuthenticated();
 
    return(
        <div>
        {/* <PageTemplate> */}
        <hr />
        <Switch>
        <Route exact path="/">
            <Products />
          </Route>
          <Route  path="/contact">
            <ContactPage />
          </Route>
          <Route path="/cart">
            <AppCart />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/sell-product">
            <SellProductPage />
          </Route>
          <Route component={Woops404} />
        </Switch>
            </div>               
         


    )
} 

   