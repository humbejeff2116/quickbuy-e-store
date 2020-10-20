










import React from'react'
import {  Route,Switch,Link } from 'react-router-dom';
import {Products} from '../components/Home/home'
import {ContactPage} from '../components/ContactPage/contact'
import {SellProductPage} from '../components/SellProductPage/sellProductPage'
import LoginPage from '../components/Login/index';
import AppCart from '../components/Cart/cart';
import Woops404 from '../components/404/woops404'
import Header from './header'



export default function App(){
    return(
        <div>
            <Header/>
         
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