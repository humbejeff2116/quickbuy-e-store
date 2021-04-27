
import React from 'react';
import './App.css';
import {  Route,Switch} from 'react-router-dom';
import HomePage from '../components/Home/home';
import Login from '../components/Login/login';
import Signup from '../components/SignupPage/signup';
import Cart from '../components/Cart/index';
import AppCheckout from '../components/Checkout/index';
import {ContactPage} from '../components/ContactPage/contact';
import {SellProductPage} from '../components/SellProductPage/sellProductPage';
import AccessoriesPage from '../components/AccessoriesPage/accessoriesPage';
import JewelriesPage from '../components/JewelriesPage/jewelriesPage';
import {AdvertisePage} from '../components/AdvertisePage/advertise';
import {View} from '../components/ViewItemPage/view';
import {DashboardPage} from '../components/Dashboard/index';
import Woops404 from '../components/404/woops404';
import  PopularCollectionsPage  from '../components/PopularCollectionPage/popularCollectionPage';
import  LatestDealsPage  from '../components/LatestDealsPage/latestDealsPage';
import  WomenCollectionsPage from '../components/WomenCollectionPage/womenCollectionPage';
import MenCollectionsPage from '../components/MenCollectionPage/menCollectionPage';
import MenClothingsPage from '../components/MenClothingsPages/menClothings';
import WomenClothingsPage from '../components/WomenClothingsPages/womenClothings';
import ContextProvider from '../components/Context/contextProvider';








export default function App() {
    return(
        <ContextProvider> 
        <div className="container">
        <Switch>            
            <Route exact  path="/">
                <HomePage/>
            </Route>
            <Route exact path="/popular-collections">
                <PopularCollectionsPage/>
            </Route>
            <Route exact path="/women-collections">
                <WomenCollectionsPage/>
            </Route>
            <Route exact path="/women-clothings">
                <WomenClothingsPage/>
            </Route>
            <Route exact path="/men-collections">
                <MenCollectionsPage/>
            </Route>
            <Route exact path="/men-clothings">
                <MenClothingsPage/>
            </Route>               
            <Route exact  path="/latest-deals">
                <LatestDealsPage/>
            </Route>  
            <Route exact path="/cart">
                <Cart/>
            </Route>
            <Route exact path="/checkout">
                <AppCheckout/>
            </Route>
            <Route exact path="/jewelries">
                <JewelriesPage/>
            </Route>
            <Route exact path="/accessories">
                <AccessoriesPage/>
            </Route>
            <Route exact path="/contact">
                <ContactPage/>
            </Route>
            <Route exact path="/sell-Product">
                <SellProductPage/>
            </Route>
            <Route exact path="/advertise">
                <AdvertisePage/>
            </Route>
            <Route exact path="/view-item">
                <View/>
            </Route>
           <Route exact path="/login">
                <Login/>
            </Route>
            <Route exact path="/signup">
                <Signup/>
            </Route>
            <Route  path="/users/dashboard">
                <DashboardPage/>
            </Route>
            <Route path="*">
                <Woops404/>
            </Route>                         
        </Switch> 
        </div>
        </ContextProvider>    
    )
} 