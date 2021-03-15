









import React from 'react'
import facebookIcon from '../images/facebook.svg'
import googlePlusIcon from '../images/google-plus.svg'
import  instagramIcon from '../images/instagram.svg'
import linkedinIcon from '../images/linkedin.svg'
import twitterIcon from '../images/twitter.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const user = <FontAwesomeIcon  icon={['fas', "user"]}  />
const about = <FontAwesomeIcon  icon={['fas', "info-circle"]}  />
const female = <FontAwesomeIcon  icon={['fas', "female"]}  />
const male = <FontAwesomeIcon  icon={['fas', "male"]}  />
const jewelries = <FontAwesomeIcon  icon={['fas', "gem"]}  />
const accessories = <FontAwesomeIcon  icon={['fas', "hat-wizard"]}  />
const cart = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}  />
const home = <FontAwesomeIcon  icon={['fas', "home"]}  />



const ApplicationData= function(){ };





const data = {

    links:{
        navLinks : [
            { name:"Home", href:"/", icon:home},
            { name:"About", href:"/about", icon:about},
            { name:"Women Clothings", href:"/women-clothings", icon:female },
            { name:"Men Clothings", href:"/men-clothings", icon:male },
            { name:"Jewelries", href:"/jewelries", icon:jewelries },
            { name:"Accessories", href:"/accessories", icon:accessories },
            { name:"Shopping Cart", href:"/cart", icon:cart },
            
          ],

        navGifsLinks : [
            {href:"/contact", name:'Contact Us'},
            {href:"/sellproduct", name:'Sell a product '},
            {href:"/advertise", name:'Advertise with us'}
        ],

        socialLinks : [
            {src:facebookIcon, alt:'facebook'},
            {src:instagramIcon, alt:'instagram'},
            {src:twitterIcon, alt: 'twitter'},
            {src:linkedinIcon, alt:'linkedin'},
            {src:googlePlusIcon, alt:'google+'},  
        ],
        mobileNavLinks : [
            { name:"Home", href:"/", icon:home},
            { name:"About", href:"/about", icon:about},
            { name:"Women Clothings", href:"/women-clothings", icon:female },
            { name:"Men Clothings", href:"/men-clothings", icon:male },
            { name:"Jewelries", href:"/jewelries", icon:jewelries },
            { name:"Accessories", href:"/accessories", icon:accessories },
            { name:"Shopping Cart", href:"/cart", icon:cart },
            { name:"Signup/Login", href:"/login", icon:user },
            
          ]
    },

    formData : [
        {
          
           formInputs : [
                { type:"text",placeholder:"Firstname", name:'firstname',capitalize:true },
                { type:"text",placeholder:"Lastname", name:'lastname', capitalize:true },
            ]
        },
        {
            formInputs : [
                { type:"text",placeholder:"Email Address", name:'email', },
                { type:"text",placeholder:"Phone Number", name:'phonenumber',},
            ]
        },
        {
            formInputs : [
                { type:"password",placeholder:"Password", name:'password', },
                { type:"password",placeholder:"Repeat Password", name:'password2', },
            ]
        }
        
    ]
   
}

ApplicationData.prototype.data = data;

ApplicationData.prototype.getNavLinks = function(){
    return this.data.links.navLinks;
}
ApplicationData.prototype.getNavGifsLinks = function(){
    return this.data.links.navGifsLinks;
}
ApplicationData.prototype.getSocialLinks = function(){
    return this.data.links.socialLinks;
}
ApplicationData.prototype.getSideNavLinks = function(){
    return this.data.sideNavLinks;
}
ApplicationData.prototype.getMobileNavLinks = function(){
    return this.data.links.mobileNavLinks;
}
ApplicationData.prototype.getFormData = function(){
    return this.data.formData;
}

export default new ApplicationData();