










import React from 'react';
import {Link} from 'react-router-dom'
import './linksPage.css';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import logo from '../../images/logo.png'



const LinksPage =(props)=>{
 
   const view = (src,name,price,id,available) => {
        let item =[];
          item.push({ src, name, price, id,available });
         localStorage.setItem('view', JSON.stringify(item))
    
      }
      const {src,name,price,available,id} = props;
      
      return (
        <ErrorBoundary>

          <div className="all-items-picture">
            
              <div className="see-all-items-details">
              <img src={logo} width="80%" height="80%" alt="img"/><br />            
              <span className="see-all-product-title"><small>Name: {name}</small></span><br />
              <span className="see-all-product-price"><small>Price: ${price}</small></span><br />
              </div>
              { 
                (available) ?
                  <div className="see-all-view">               
                  {/* view item */}
                <Link to="/view-item">
                <button className="btn btn-sm btn-warning"
                onClick={()=>view(src,name,price,id,available)}>
                  view
                </button>
                </Link>
                  </div> :  <p className="text-danger"> product is out of stock </p>
        
              } 
             
      
          </div>
          </ErrorBoundary>

      )
  
      
}
export default LinksPage;

