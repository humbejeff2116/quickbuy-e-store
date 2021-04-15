


import React from 'react';
import {NavSearchBar} from './navSearchBar';
import {NavLinks} from './navLinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  NavLink } from 'react-router-dom';
import MyContext from '../Context/context';
const cart = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}  />






export const  MainNavBar = (props) => {
   

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
        <>
        <div className="top-nav-bar">
            < NavSearchBar 
            searchProducts ={props.searchProducts}
            searchValue ={props.searchValue}
            auth={props.auth}
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
            {
                (props.openMobileNav) ?  
                <button className="nav-open-icon closebtn" onClick={()=>props.setOpenMobileNav(prevState=> !prevState)}>
                    {close}
                </button> :
                <span className="nav-open-icon" onClick={()=>props.setOpenMobileNav(prevState=> !prevState)} >
                    {open}
                </span>  
            }               
        </div>
        </>
    )   
}