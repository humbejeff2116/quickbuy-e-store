import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import {NavSearchBar} from './navSearchBar';
import {NavLinks, NavGifsLinks,SocialNav} from './navLinks';
import ApplicationData from '../../data/appData';



// main navigation bar
export const  MainNavBar =(props)=>{
 

    const navLinks = ApplicationData.getNavLinks()
    function setUnicode(unicode){
        let dummy;
             let decoded
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
        < NavSearchBar />
        <nav className="main-navigation" id="main-navigation" >             
        {
            navLinks.map((links,i)=>
                <NavLinks  key={i} {...links} />
            )
        }
       
        </nav>  
            {/* mobile navigation open icon */}
           
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



// navigation gifs bar
export const NavGifsBar = ( ) => {
    const navGifsLinks =  ApplicationData.getNavGifsLinks();
    return(
        <div className="gifs-bar">
        <div>
            ist gif bar
        </div>
            <div className="gifs">
                <div>
                    gifs go here
                </div>
                    <div className="gifs-top-nav">
                       {
                           navGifsLinks.map((links,i)=>
                           <NavGifsLinks key={i} {...links}/>
                           )
                       }
                    </div>
            </div>
        {/* // social bar*/}
        <SocialBar />
    </div>

    )
}
  
   
const SocialBar = ( ) => {
    const socialLinks =ApplicationData.getSocialLinks()
    return(
        <div className="gifs-social-list">
        <ul className="social-list">
            {
                socialLinks.map((links,i)=>
                <SocialNav key={i} {...links}/>
                )
            }
            
        </ul>
    </div>

    )
}  
   
  