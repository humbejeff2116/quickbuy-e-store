

import React from 'react';
import { NavSearchBar } from './navSearchBar';
import { NavLinks } from './navLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  NavLink } from 'react-router-dom';
import MyContext from '../Context/context';
const cart = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}/>






export const  MainNavBar = (props) => {
    return(
        <>
        <div className="top-nav-bar">
            < NavSearchBar 
            searchProducts ={props.searchProducts}
            searchValue ={props.searchValue}
            auth={props.auth}
            openMobileNav={props.openMobileNav}
            setOpenMobileNav={props.setOpenMobileNav}
            logOut={props.logOut}
            />
            <MyContext.Consumer>
            {context => (
                <nav className="main-navigation" id="main-navigation" >             
                    {
                        props.navLinks.map((links, i)=>
                            <NavLinks  key={i} {...links} />
                        )
                    }
                    <NavLink
                    exact 
                    to={"/cart"} 
                    activeClassName="nav-link-active"
                    className="nav-item nav-link"
                    title={"Shopping Cart"} >              
                    <i>{cart}</i>
                    <span className="nav-text">{"Shopping Bag"}</span>
                    <span className={context.cartQuantity > 0 ?"show-qty" : "hide-qty"}>
                        {context.cartQuantity}
                    </span> 
                    </NavLink> 
                </nav>
            )}
            </MyContext.Consumer>  
        </div>
        </>
    )   
}