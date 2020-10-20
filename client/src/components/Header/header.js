









import React from 'react';
// import {makeStyles} from '@material-ui/core/Styles';
// import Paper from '@material-ui/core/Paper'
// import Grid from '@meterial-ui/core/Grid'
import logo from '../../images/logo.png'
import facebookIcon from '../../images/facebook.svg'
import googlePlusIcon from '../../images/google-plus.svg'
import  instagramIcon from '../../images/instagram.svg'
import linkedinIcon from '../../images/linkedin.svg'
import twitterIcon from '../../images/twitter.svg'

import {  Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { isAuthenticated } from '../../services/ecormerce.service'
import {AboutMenuDropdown} from '../DropdownMenu/aboutMenuDropdown'
import {AllCategoriesDropdown} from '../DropdownMenu/allCategoriesDropdown'
import{MenClothingsDropdown} from '../DropdownMenu/menClothingsDropdown'
import {WomenClothingsDropdown} from '../DropdownMenu/womenClothingsDropdown'


// const facebook = <FontAwesomeIcon icon={['fab', 'facebook']} size="xl" />
// const twitter = <FontAwesomeIcon icon={['fab', 'twitter']} size="xl"  />
// const instagram = <FontAwesomeIcon icon={['fab', 'instagram']} size="xl"  />
// const google = <FontAwesomeIcon icon={['fab', 'google']} size="xl"  />
// const linkedin = <FontAwesomeIcon icon={['fab', 'linkedin']} />
const search = <FontAwesomeIcon icon={['fas', "search"]}  />
const about = <FontAwesomeIcon  icon={['fas', "info-circle"]}  />
const female = <FontAwesomeIcon  icon={['fas', "female"]}  />
const male = <FontAwesomeIcon  icon={['fas', "male"]}  />
const jewelries = <FontAwesomeIcon  icon={['fas', "gem"]}  />
const accessories = <FontAwesomeIcon  icon={['fas', "hat-wizard"]}  />
const cart = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}  />
const user = <FontAwesomeIcon  icon={['fas', "user"]}  />
const home = <FontAwesomeIcon  icon={['fas', "home"]}  />




// navigation search bar
const NavSearchBar =()=>{

    const logOut= ( )=>{

        localStorage.removeItem('x-access-token');
   
      }

    const auth = isAuthenticated();
  
    return(

        <div className="search">
            <div className="logo">
            <a href="index.html"><img width="90px" height="40px;" src={logo} alt="logo" title="site logo" /></a>
            </div>
            <div className="search-bar">
                <form className="search-bar-form">
                    <input type="search" placeholder="search for clothing brands and collections" /><span><i></i></span>
    <button><i className="fa fa-search fa-lg">{search}</i></button>
                </form>
            </div>
            <div className="login">

            { 
                (auth) ? <Link className="nav-item nav-link" to="/checkout">Checkout</Link> : ''
            }

            {   
                ( auth ) ?  ( <a className="nav-item nav-link" href="/" onClick={()=>logOut()}>Logout</a>) : 

                ( <Link className="nav-item nav-link float-right" to="/login">  <i className="fa fa-tshirt">{user}</i>Signup/Login</Link> )
            }
            </div>
              
        </div>

    )

}

    
// main navigation bar
 export class MainNavBar extends React.Component{
     constructor(props){
         super(props);
         this.state = {

            toggle1:false,
            toggle2:false,
            toggle3:false,
            toggle4:false

         }
         this.navContainer = React.createRef()
     }
    //  creates a drop down when about link is clicked
     toggleAbout= ()=> {
      
        this.setState(prevState=>({
            toggle1:!prevState.toggle1,
            toggle2:false,
            toggle3:false,
            toggle4:false

        }))
    }
    // creates a dropdown when all categories link is clicked
    toggleAllCategories = ( )=> {
       
         this.setState(prevState=>({
            toggle1:false,
            toggle2:!prevState.toggle2,
            toggle3:false,
            toggle4:false
        }))
    }

   toggleMenClothings = ( )=> {
      
        this.setState(prevState=>({
            toggle1:false,
            toggle2:false,
            toggle3:!prevState.toggle3,
            toggle4:false
        }))     
    }

   toggleWomenClothings = ( )=> {
      
        this.setState(prevState=>({
            toggle1:false,
            toggle2:false,
            toggle3:false,
            toggle4:!prevState.toggle4,
        }))
    }
// opens the navigation panel when on mobile device
    openNav = (id)=> {

        document.getElementById(id).style.width="100%";
    }
    // closes the navigation panel when on mobile device
    closeNav=(id)=>{
    
        document.getElementById(id).style.width="0";
        
    }

    // set a mouseup event when component mount used to clear dropdown
    componentDidMount(){

        document.addEventListener('mouseup',this.clearDropdown1)

    }
    // cleans the mouse up event when component is about to dismount
    componentWillUnmount(){

        document.removeEventListener('mouseup',this.clearDropdown1)

    }
    // clears the dropdown list when mouse is clicked on document outside the dropdown
    clearDropdown1=(e)=>{

        e.preventDefault()
        if(this.navContainer.current && !this.navContainer.current.contains(e.target)){
            this.setState({
                toggle1:false,
                toggle2:false,
                toggle3:false,
                toggle4:false
            })
        }
    }
    clearDropdown2 =(id)=> { 
         
        document.getElementById(id).style.display ='none'
        this.setState({
            toggle1:false,
            toggle2:false,
            toggle3:false,
            toggle4:false
        })
    }
    
  render(){

   

    return(
    <>

    <div className="top-nav-bar">
    {/* // recieve navigation search bar */}
    < NavSearchBar />
        <nav className="main-navigation" id="main-navigation" ref={this.navContainer} >
            {/* onClick ={closeNav()} */}           
            <Link className="navbar-brand" to="/"> 
    <i className="fa fa-home fa-lg">{home}</i><span className="nav-text">Home</span>
            </Link>
            {/* link creates dropdown when clicked */}
            <Link className="navbar-brand" id="drop" to={''}onClick={(e)=>{e.preventDefault();this.toggleAbout()}} > 
    <i className="fa fa-home fa-lg">{about}</i><span className="nav-text">About</span>
            </Link>
            {/* about menu dropdown starts here */}
            { 

                this.state.toggle1 && ( <AboutMenuDropdown clearDropdown={()=>this.clearDropdown2('dropdown')}  /> )

            }
            <button className="closebtn" onClick={()=>this.closeNav('main-navigation')}>&times;</button>

            <Link className="nav-item nav-link" to={''}  onClick={(e)=>{e.preventDefault();this.toggleAllCategories()}} >
            <i className="fa fa-home fa-lg"></i><span className="nav-text">All Categories</span>
            </Link>
            { 

                this.state.toggle2 && ( <AllCategoriesDropdown clearDropdown={()=>this.clearDropdown2('dropdown')}  /> )

            }
            <Link className="nav-item nav-link" to={''} onClick={(e)=>{e.preventDefault();this.toggleWomenClothings()}} >
        <i className="fa fa-tshirt">{female}</i><span className="nav-text">Women Clothings</span> 
            </Link>
            { 

                this.state.toggle3 && ( <WomenClothingsDropdown clearDropdown={()=>this.clearDropdown2('dropdown')}  /> )

            }
            <Link className="nav-item nav-link" to={''} onClick={(e)=>{e.preventDefault();this.toggleMenClothings()}} >
        <i className="fa fa-tshirt">{male}</i><span className="nav-text">Men Clothings</span>
            </Link>
            { 

                this.state.toggle4 && ( <MenClothingsDropdown clearDropdown={()=>this.clearDropdown2('dropdown')}  /> )

            }
            <Link className="nav-item nav-link" to="/jewelries">
        <i className="fa fa-tshirt">{jewelries}</i><span className="nav-text">Jewelries</span>
            </Link>

            <Link className="nav-item nav-link" to="/accessories">
        <i className="fa fa-tshirt">{accessories}</i><span className="nav-text">Accesories</span>
            </Link>

            <Link className="nav-item nav-link" to="/cart">
        <i className="fa fa-tshirt">{cart}</i><span className="nav-text">shopping cart </span>   
            </Link>

            <Link className="nav-item nav-link" to="/login">
          <span href="" id="sign-up-link">Signup/Login</span>
            </Link>
           
        </nav>
        
        {/* onClick={props.openNav} */}
        <span className="nav-open-icon" onClick={()=>this.openNav('main-navigation')} >&#9776;</span>
    </div>
    {/* drop down menu for about */}    
    </>
     
    )
  } 
       
}

// navigation gifs bar
export const NavGifsBar = ( )=>
    <div className="gifs-bar">
        <div>
            ist gif bar
        </div>
            <div className="gifs">
                <div>
                    gifs go here
                </div>
                    <div className="gifs-top-nav">
                          <Link className="nav-item nav-link" to="/contact">contact Us </Link>
                        <Link className="nav-item nav-link" to="/sellproduct">Sell a product </Link>
                        <Link className="nav-item nav-link" to="/advertise">Advertise With Us  </Link>
                    </div>
            </div>
        {/* // social bar goes here */}
        <SocialBar />
    </div>

const SocialBar =( )=>
    <div className="gifs-social-list">
        <ul className="social-list">
            <img src={facebookIcon} width="30px" height="30px" alt="facebook" />
            <img src={instagramIcon} width="30px" height="30px" alt="instagram" />
            <img src={twitterIcon} width="30px" height="30px" alt="twitter"/>
            <img src={linkedinIcon} width="30px" height="30px" alt="linkedin" />
            <img src={googlePlusIcon} width="30px" height="30px" alt="google+" />
            {/* <li id="facebook"><a href="/facebook.com"><i className="facebook fa-lg">{facebook}</i></a></li>
            <li id="instagram"><a href="/instagram"><i className="instagram fa-lg">{instagram}</i></a></li>
            <li><a href="/twitter"><i className=" fa-lg">{twitter}</i></a></li>
            <li><a href="/linkedin"><i className=" fa-lg">{linkedin}</i></a></li>
            <li><a href="/youtube"><i className=" fa-lg">{google}</i></a></li> */}
        </ul>
    </div>