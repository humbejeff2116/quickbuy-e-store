import React from 'react';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import {Link} from 'react-router-dom'
import logo from '../../images/logo.png'




//  the ProductItem component, which we will be used to render each product on the product list.
export function DoubleCollectionItem(props){

  const view = (src,name,price,description,id,available) => {
  let item =[];
    item.push({ src, name, price,description, id,available });
   localStorage.setItem('view', JSON.stringify(item))


}
    const {src,name,price,description,available,id} = props;
    
  return (
    <ErrorBoundary>

     <div className="items-picture-six"  onClick={()=>view(src,name,price,description,id,available)} >
      
     <div className="items-six-details">
        <Link to="view-item">   
        <img src={logo} width="80%" height="80%" alt="img" /><br />      
        <span className="product-title"><small>name: {name}</small></span><br />
        <span className="product-price"><small>price: ${price}</small></span><br />
        { (!available) ? <span className="product-text-danger"> product is out of stock </span> : '' }
        </Link>
        </div>
                  
        
          </div>
    </ErrorBoundary>

   )


}


 
   



