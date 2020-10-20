








import React from 'react'
import {  Link } from 'react-router-dom';



export default function Header(){
    return(
        <nav className="main-navigation" id="main-navigation" >             
        <Link className="navbar-brand" to="/"> 
            <i className="fa fa-home fa-lg"></i><span className="nav-text">Home</span>
        </Link>    
        <Link className="nav-item nav-link" to="/contact">
        <span className="nav-text">contact</span>
        </Link>      
     
        <Link className="nav-item nav-link" to="/sell-product">
        <span className="nav-text">sell</span>
        </Link>
        <Link className="nav-item nav-link" to="/cart">
        <span className="nav-text">shopping cart logo</span>   
        </Link>
        <Link className="nav-item nav-link" to="/login">
        <span href="" id="sign-up-link">Signup/Login</span>
        </Link>
       
    </nav>
    )
}