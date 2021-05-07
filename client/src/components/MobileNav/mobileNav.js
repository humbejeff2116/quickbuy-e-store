import React from 'react';
import {  NavLink } from 'react-router-dom';
import ApplicationData from '../../data/appData';
import './mobileNav.css';
import MyContext from '../Context/context';


export function MobileNav(props) {
    const mobileNavLinks = ApplicationData.getMobileNavLinks();
    return(
        <MyContext.Consumer>
            { context=>(
                 <div className="mobile-nav"  ref={props.MobileNavRef}>
                 <nav className="mobile-links">
                     {
                         mobileNavLinks.map((links, i)=>
                             <MobileNavLinks key={i} {...links} />
                         )
                     }
                      <div className= "mobile-link" >
                    <NavLink
                    exact 
                    to={"/cart"} 
                    activeClassName="nav-link-active"
                    className="nav-item nav-link"
                    title={"Shopping Cart"} >              
                    <i>{props.cart}</i>
                    <span className="nav-text">{"Shopping Bag"}</span>
                    <span className={context.cartQuantity > 0 ?"show-qty" : "hide-qty"}>
                        {context.cartQuantity}
                    </span> 
                    </NavLink>
                    </div>

                     
                     {
                         <LogInNav 
                         auth={props.auth}
                         icon={props.userIcon}
                         logOut={props.logOut}
                         />
                     }
                 </nav>
             </div>
            )}
        </MyContext.Consumer>
    )
}

 function MobileNavLinks(props) {
    return (
        <div className= "mobile-link" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="mobile-nav-link-active"
            className="mobile-nav-item mobile-nav-link"
            title={props.name} 
            >
            <i>{props.icon}</i><span className="mobile-nav-text">{props.name}</span> 
            </NavLink> 
        </div> 
    ) 
}





function LogInNav(props) {
    const authNavLinks = [
        {href:'/checkout',name:'Checkout',},
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
            <div className= "mobile-link" >
                <a className="nav-item nav-link" href="/" onClick={()=>props.logOut()}>Logout</a>
            </div>
            </>
        )
    }
    return(
        <div className= "mobile-link" >
            <NavLink
            exact 
            to="/login"
            activeClassName="mobile-nav-link-active"
            className="mobile-nav-item mobile-nav-link"
            >
            <i>{props.icon}</i><span className="mobile-nav-text">Signup/Login</span> 
            </NavLink> 
        </div>  
    )
}



function AuthLinks(props) {
    return(
        <div className= "mobile-link" >
            <NavLink
            exact 
            to={props.href} 
            activeClassName="mobile-nav-link-active"
            className="mobile-nav-item mobile-nav-link"
            title={props.name} 
            >
            <i>{props.icon || ''}</i><span className="mobile-nav-text">{props.name}</span> 
            </NavLink> 
        </div> 
    )
}