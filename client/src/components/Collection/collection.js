



import React from 'react';

import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import {Link} from 'react-router-dom'
import logo from '../../images/logo.png'




    
//  the ProductItem component, which we will be used to render each product on the product list.
export class CollectionItem extends React.Component {

       
    view = (src,name,price,description,id,available) => {

      let item =[];
      item.push({ src, name, price,description, id,available });
       localStorage.setItem('view', JSON.stringify(item));


    }
  
    render(){

      const {src,name,price,description,available,id} = this.props
    
    return (
      <ErrorBoundary>
  
            <div className="items-picture"  onClick={()=>this.view(src,name,price,description,id,available)} > 
            <div className="items-details"> 
            <Link to="view-item">   
            <img src={logo} width="80%" height="80%" alt="img" /><br />      
            <span className="product-title"><small>name: {name}</small></span><br />
            <span className="product-price"><small>price: ${price}</small></span><br />
            </Link>
            </div> 
          
           { 
               (!available) ?

                  <div className="view">
                  <p className="product-text-danger"> product is out of stock </p> 
                  </div> : ''
      
          } 
      </div>
     
      </ErrorBoundary>
  
     )
  
   }
  
  }
   


<div>
  <span>Name: <span>Humbe Jeffrey</span></span>
  <span>Nationality: <span>&#127475;&#127468; Nigeria</span></span>
  <span>Specialization: <span>Web and mobile software development</span></span>
</div>