import React,{useState, useEffect} from 'react';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  NavLink } from 'react-router-dom';






export function NavSearchBar(props) {
    
    const search = <FontAwesomeIcon icon={['fas', "search"]}  />
    const user = <FontAwesomeIcon  icon={['fas', "user"]}  />

    const logOut = ( ) => {
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('user');
    }

    return(
        <div className="search">
            <div className="logo">
            <a href="/"><img width="90px" height="40px;" src={logo} alt="logo" title="quickbuy" /></a>
            </div>
            <div className="search-bar">
                <form onSubmit = {props.searchProducts} className="search-bar-form" method="GET" action="/search-product" >
                    <input type="search" name="search" ref={props.searchValue} onKeyUp = {props.searchProducts}  placeholder="Search for clothing brands and collections"  /><span><i></i></span>
                    <button type="submit" ><i className="fa fa-search fa-lg">{search}</i></button>
                </form>
            </div>
            <div className="header-login">
                <LogInNav auth={props.auth} logOut={logOut} user={user} />              
            </div>              
        </div>
    )
}



function LogInNav(props) {
   
   
    const authNavLinks = [
        {href:'/checkout',name:'Checkout'},
        {href:'/users/dashboard',name:'Dashboard'}
    ]

    if(props.auth) {
       
        
        return(
            <>
            {
                authNavLinks.map((links, i)=>
                <AuthLinks key={i} {...links} />
                )
            }
            <div className="login" >
                <a className="nav-item nav-link" href="/" onClick={()=>props.logOut()}>Logout</a>
            </div>
            </>
        )
    }
    return(
        <div className="login" >              
            <NavLink 
            exact 
            className="nav-item nav-link float-right" 
            to="/login"
            activeClassName="nav-link-active"
            >  
                <i className="fa fa-user">{props.user}</i>
                Signup/Login
            </NavLink>            
        </div>
    )
}



function AuthLinks(props) {
    return(
        <div className="login" >
            <NavLink 
            exact 
            className="nav-item nav-link" 
            to={props.href} 
            activeClassName="nav-link-active"
            >
            {props.name}
            </NavLink>
        </div>
    )
}