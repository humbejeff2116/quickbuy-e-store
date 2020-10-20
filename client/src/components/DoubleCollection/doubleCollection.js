


import React from 'react';
import './doubleCollection.css';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import {Link} from 'react-router-dom'
import logo from '../../images/logo.png'




//  the ProductItem component, which we will be used to render each product on the product list.
export class DoubleCollectionItem extends React.Component {


  view = (src,name,price,id,available) => {
  let item =[];
    item.push({ src, name, price, id,available });
   localStorage.setItem('view', JSON.stringify(item))


}

  render(){
    const {src,name,price,available,id} = this.props
 
  return (
    <ErrorBoundary>

     <div className="items-picture-six">
      
     <div className="items-six-details">
     <img src={logo} width="80%;" height="80%" alt="img" /><br />    
         <span className="product-title"><small>name:{name}</small></span><br />
         <span className="product-price"><small>price: ${price}</small></span>
         {/* <span className="product-qnty"> <small>Available: </small>{available} </span> */}
        </div>
            
          
        
         { ( available ) ?
          <div className="view-six">

              {/* view item */}
              <Link to="/view-item">
              <button className="btn btn-sm btn-warning" 
                onClick={()=>this.view(src,name,price,id,available)}>
                view
              </button>
              </Link>
          </div> : <p className="text-danger"> product is out of stock </p>
         
        }
          </div>
    </ErrorBoundary>

   )

 }

}
 
   



