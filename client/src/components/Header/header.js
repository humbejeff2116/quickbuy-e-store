import React,{useState} from 'react';
import { Redirect } from 'react-router-dom';
import {NavSearchBar} from './navSearchBar';
import {NavLinks, NavGifsLinks,SocialNav} from './navLinks';
import ApplicationData from '../../data/appData';



// main navigation bar
export const  MainNavBar =()=>{
    const [openMobileNav, setOpenMobileNav] = useState(false);

    const navLinks = ApplicationData.getNavLinks() 
   
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
        <button className="closebtn" onClick={()=>setOpenMobileNav(false)}>&times;</button>
        </nav>  
            {/* mobile navigation open icon */}
            <span className="nav-open-icon" onClick={()=>setOpenMobileNav(true)} >&#9776;</span>
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
   
  