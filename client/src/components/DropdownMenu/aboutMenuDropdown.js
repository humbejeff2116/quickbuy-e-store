








import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import './aboutMenu.css'
const selectedStyle = {
    backgroundColor:'white',
    color:'purple'
}



export const AboutMenuDropdown =(props)=>{

  return(
      
    <>
      <div className="about-menu" id="dropdown"  onMouseLeave={props.clearDropdown}>
              <div className="dropdown1">
              <Link to='/about' activestyle={selectedStyle} >company</Link>
              <Link to='/about' activestyle={selectedStyle} >company</Link>
              <Link to='/about' activestyle={selectedStyle} >company</Link>
              <Link to='/about' activestyle={selectedStyle} >company</Link>
              </div>
  
              <div className="dropdown2">
              <Link to='/about' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">company</i></Link>
              <Link to='/about' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">company</i></Link>
              <Link to='/about' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">company</i></Link>
              </div>
  </div>
  
  </>
  
  )
  
  
  }