import React from 'react';
import {  NavLink } from 'react-router-dom';



export function NavLinks(props) {
    return (
        <NavLink
        exact 
        to={props.href} 
        activeClassName="nav-link-active"
        className="nav-item nav-link"
        title={props.name} >
            <i>{props.icon}</i><span className="nav-text">{props.name}</span> 
        </NavLink> 
    ) 
}

export function NavGifsLinks(props) {
    return(
        <NavLink
        exact 
        className="nav-item nav-link"
        activeClassName="nav-link-active" 
        to={props.href}
        >
            {props.name}
        </NavLink>
    )
}

export function SocialNav(props) {
    return(
        <img src = {props.src} width="30px" height="30px" alt={props.alt} />
    )
}