











import React from 'react';
import { NavGifsLinks, SocialNav } from './navLinks';






export const NavGifsBar = (props) => {
   
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
                        props.navGifsLinks.map((links, i)=>
                        <NavGifsLinks key={i} {...links}/>
                        )
                    }
                </div>
            </div>
        <SocialBar socialLinks={props.socialLinks} />
        </div>
    )
}
  
   
const SocialBar = (props) => {
    return(
        <div className="gifs-social-list">
            <ul className="social-list">
                {
                    props.socialLinks.map((links, i)=>
                    <SocialNav key={i} {...links}/>
                    )
                }               
            </ul>
        </div>
    )
}   