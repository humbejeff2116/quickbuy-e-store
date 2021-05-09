
import React from 'react'
import facebookIcon from '../images/facebook.svg'
import googlePlusIcon from '../images/google-plus.svg'
import  instagramIcon from '../images/instagram.svg'
import linkedinIcon from '../images/linkedin.svg'
import twitterIcon from '../images/twitter.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const about = <FontAwesomeIcon  icon={['fas', "info-circle"]}  />
const female = <FontAwesomeIcon  icon={['fas', "female"]}  />
const male = <FontAwesomeIcon  icon={['fas', "male"]}  />
const jewelries = <FontAwesomeIcon  icon={['fas', "gem"]}  />
const accessories = <FontAwesomeIcon  icon={['fas', "hat-wizard"]}  />
const home = <FontAwesomeIcon  icon={['fas', "home"]}  />

let _firstnameValue = React.createRef();
let _lastnameValue = React.createRef();
let _emailValue = React.createRef();
let _phonenumberValue = React.createRef();
let _passwordValue = React.createRef();
let _password2Value = React.createRef();




// function to inject unicode to html using javascript
function setUnicode(unicode) {
    let dummy;
    let decoded;
        if (!unicode) {
            return decoded = "";
        }
        dummy = document.createElement('textarea');
        dummy.innerHTML = unicode;
        decoded = dummy.value;
    return decoded;
}
 const and =setUnicode('&amp;');
 const copyright =setUnicode('&copy;');

const data = {

    links:{
        navLinks : [
            { name:"Home", href:"/", icon:home},
            { name:"About", href:"/about", icon:about},
            { name:"Women Clothings", href:"/women-clothings", icon:female },
            { name:"Men Clothings", href:"/men-clothings", icon:male },
            { name:"Jewelries", href:"/jewelries", icon:jewelries },
            { name:"Accessories", href:"/accessories", icon:accessories },   
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
            
        ],


          footerMainLinks :[
            {
              title:'quick buy', 
              links:[{href:'/about', name:'About us'},
                   {href:'/services', name:'Our services'},
                   {href:'/customers', name:'Customers'},
                   {href:'/pricing', name:'Pricing'}
            
              ]
            },
            {
              title:'Contact us', 
              links:[{href:'/about', name:'About us'},
                   {href:'/services', name:'Our services'},
                   {href:'/customers', name:'Customers'},
                   {href:'/pricing', name:'Pricing'}
            
              ]
            },
            {
              title:'Support', 
              links:[{href:'/about', name:'About us'},
                   {href:'/services', name:'Our services'},
                   {href:'/customers', name:'Customers'},
                   {href:'/pricing', name:'Pricing'}
            
              ]
            },
            {
              title:'Resources', 
              links:[{href:'/about', name:'About us'},
                   {href:'/services', name:'Our services'},
                   {href:'/customers', name:'Customers'},
                   {href:'/pricing', name:'Pricing'}
            
              ]
            }
          ],

          footerLegalLinks : [
            {href:'/terms-and-conditions', name:`Terms ${and} Conditions`},
            {href:'/privacy', name:'Privacy Policy'},
            {href:'/', name:'Developed by Humbe Jeffrey'},
            {href:'/hujesoft.com', name:`${copyright} ${new Date().getFullYear()} Copyright @Jeff.codes `},
           ],

           footerContentLinks : [
            {
              title:' quick buy', 
              links:[{href:'/about', name:'About us'},
                   {href:'/services', name:'Our services'},
                   {href:'/customers', name:'Customers'},
                   {href:'/pricing', name:'Pricing'}
            
              ]
            },
            {
              title:'Contact us', 
              links:[{href:'/about', name:'About us'},
                   {href:'/services', name:'Our services'},
                   {href:'/customers', name:'Customers'},
                   {href:'/pricing', name:'Pricing'}
            
              ]
            },
           
          ],
          sideNavLinks :[

            {href:'/users/dashboard',name:'Dashboard',icon:''},
            {href:'/users/dashboard/account',name:'Account',icon:''},
            {href:'/users/dashboard/profile',name:'Profile',icon:''},
            {href:'/users/dashboard/orders',name:'Orders',icon:''},
            {href:'/users/dashboard/settings',name:'Settings',icon:''},
            {href:'/users/dashboard/help',name:'Help',icon:''}
        
        ]
    },

    signupFormData : [
        {
          
            formInputs : [
                { type: "text",placeholder: "Firstname", name: 'firstname', inputRef: _firstnameValue, capitalize: true },
                { type: "text",placeholder: "Lastname", name: 'lastname', inputRef: _lastnameValue, capitalize: true },
            ]
        },
        {
            formInputs : [
                { type:"email",placeholder:"Email Address", inputRef: _emailValue, name:'email', },
                { type:"text",placeholder:"Phone Number",  inputRef: _phonenumberValue, name:'phonenumber',},
            ]
        },
        {
            formInputs : [
                { type:"password",placeholder:"Password",  inputRef: _passwordValue, name:'password', },
                { type:"password",placeholder:"Repeat Password",  inputRef: _password2Value, name:'password2', },
            ]
        }
        
    ]
   
}
const ApplicationData= function( ){ };
ApplicationData.prototype.data = data;
ApplicationData.prototype.getNavLinks = function( ) {
    return this.data.links.navLinks;
}
ApplicationData.prototype.getNavGifsLinks = function( ) {
    return this.data.links.navGifsLinks;
}
ApplicationData.prototype.getSocialLinks = function( ) {
    return this.data.links.socialLinks;
}
ApplicationData.prototype.getSideNavLinks = function( ){ 
    return this.data.links.sideNavLinks;
}
ApplicationData.prototype.getMobileNavLinks = function( ) {
    return this.data.links.mobileNavLinks;
}

ApplicationData.prototype.getFooterMainLinks = function( ) {
    return this.data.links.footerMainLinks;
}
ApplicationData.prototype.getFooterContentLinks = function( ) {
    return this.data.links.footerContentLinks;
}
ApplicationData.prototype.getFooterLegalLinks= function( ) {
    return this.data.links.footerLegalLinks;
}
ApplicationData.prototype.getSignupFormData = function( ) {
    return this.data.signupFormData;
}

export default new ApplicationData();