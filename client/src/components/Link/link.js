
import React from 'react';
import {NavLink} from 'react-router-dom';




export default function Link(props) {
    if(props.className) {
        return(
            <div className={props.className} >
                <NavLink 
                 exact
                 activeClassName={props.activeClassName}
                 to={props.href} >
                     <i>{props.icon}</i><span className={props.spanClassName}>{props.name}</span> 
                </NavLink>               
            </div>
        )
    }
    return(
        <NavLink to={props.href} > 
        <i>{props.icon}</i><span className={props.spanClassName}>{props.name}</span> 
        </NavLink>   
    ) 
}