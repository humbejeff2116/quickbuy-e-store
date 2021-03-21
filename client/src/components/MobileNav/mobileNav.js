import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  NavLink } from 'react-router-dom';
import ApplicationData from '../../data/appData';
import './mobileNav.css';



export function MobileNav(props) {
    const mobileNavLinks = ApplicationData.getMobileNavLinks()
    //   const showHideClassName = show ? "mobile-nav " : "modal display-none";
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
     const [active, setActive] = React.useState(false);
    //  `mobile-link ${props.imageLoaded ? 'visible' :  'hidden'}`
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