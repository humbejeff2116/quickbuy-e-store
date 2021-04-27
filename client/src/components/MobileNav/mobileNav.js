import React from 'react';
import {  NavLink } from 'react-router-dom';
import ApplicationData from '../../data/appData';
import './mobileNav.css';



export function MobileNav( ) {
    const mobileNavLinks = ApplicationData.getMobileNavLinks()
    return(
        <div className="mobile-nav">
            <nav className="mobile-links">
                {
                    mobileNavLinks.map((links, i)=>
                        <MobileNavLinks key={i} {...links} />
                    )
                }
            </nav>
        </div>
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