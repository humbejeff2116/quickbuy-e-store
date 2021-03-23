


import React from 'react';
import {NavSearchBar} from './navSearchBar';
import {NavLinks} from './navLinks';
import ApplicationData from '../../data/appData';






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

            />
            <nav className="main-navigation" id="main-navigation" >             
                {
                    props.navLinks.map((links, i)=>
                        <NavLinks  key={i} {...links} />
                    )
                }
            </nav>  
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