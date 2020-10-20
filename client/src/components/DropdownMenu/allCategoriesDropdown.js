

















import React from 'react'
import {Link} from 'react-router-dom'
import './aboutMenu.css'
const selectedStyle = {
    backgroundColor:'white',
    color:'purple'
}



export const AllCategoriesDropdown =(props)=>{
     
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

//   return(
//     <Grid container>
//       {/* first grid empty */}
//       <Grid item xs={12} sm={2}>
//         {''}
//       </Grid>
//       {/* second grid */}
//       <Grid item xs={12} sm={2}>
//       <div className="dropdown1">
//         <h4>web dev</h4>
//       <Link to='/about' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">company</i></Link>
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">history</i></Link>
//       <Link to='/about/services' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">services</i></Link>
//       <Link to='/about/location' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">location</i></Link>          
//       </div>
      
//       </Grid>
//        {/*third grid  */}
//       <Grid item xs={12} sm={2}>
//       <h4>video games</h4>
//       <div className="dropdown2">
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">facebook</i></Link>
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">facebook</i></Link>
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">facebook</i></Link>
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">facebook</i></Link>
//       </div>
   
    
//       </Grid>
//        {/*fourth grid  */}
//       <Grid item xs={12} sm={2}>
//       <h4>poker</h4>
//       <div className="dropdown2">
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">facebook</i></Link>
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">facebook</i></Link>
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">facebook</i></Link>
//       <Link to='/about/history' activestyle={selectedStyle} ><i className="fa fa-facebook fa-lg">facebook</i></Link>
//       </div>
   
     
//       </Grid>

//     <div className="about-menu" id="about-dropdown" onMouseLeave={()=>clearDropdown('about-dropdown')}>
//     </div>

     
//     </Grid>
    

//   )

