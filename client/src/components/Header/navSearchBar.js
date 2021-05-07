
import React from 'react';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  NavLink } from 'react-router-dom';



export function NavSearchBar(props) {
    const search = <FontAwesomeIcon icon={['fas', "search"]}  />
    const user = <FontAwesomeIcon  icon={['fas', "user"]}  />
    function setUnicode(unicode) {
        let dummy;
        let decoded;
        if(!unicode){
            return decoded ="";             
        }
        dummy = document.createElement('textarea');
        dummy.innerHTML = unicode;
        decoded = dummy.value;
        return decoded;
    }

    const open = setUnicode('&#9776;')
    const close = setUnicode('&times;') 
    return(
        <div className="search">
            <div className="logo">
            <a href="/"><img width="90px" height="40px" src={logo} alt="logo" title="quickbuy" /></a>
            </div>
            <div className="search-bar">
                <form onSubmit = {props.searchProducts} className="search-bar-form" method="GET" action="/search-product" >
                    <input type="search" name="search" ref={props.searchValue} onKeyUp = {props.searchProducts}  placeholder="Search for clothings..."  /><span><i></i></span>
                    <button type="submit" ><i className="fa fa-search fa-lg">{search}</i></button>
                </form>
            </div>
            <div className="header-login">
                <LogInNav auth={props.auth} logOut={props.logOut} user={user} />              
            </div> 

            {
                (props.openMobileNav) ? 
                <div  className="mobile-navv"> 
                <button className="nav-open-icon closebtn" onClick={()=>props.setOpenMobileNav(false)}>
                    {close}
                </button>
                </div> :
               <div  className="mobile-navv">
                <span className="nav-open-icon" onClick={()=>props.setOpenMobileNav(true)}>
                    {open}
                </span> 
                </div> 
            }                
        </div>
    )
}

function LogInNav(props) {
    const authNavLinks = [
        {href:'/checkout',name:'Checkout'},
        {href:'/users/dashboard',name:'Dashboard'}
    ]
    if (props.auth) {
       
        
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