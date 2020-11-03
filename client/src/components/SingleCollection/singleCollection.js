











import React from 'react';
import './singleCollection.css'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'






export class SingleCollectionItem extends React.Component {

 
  view = (src,name,price,id,available) => {
    let item =[];
      item.push({ src, name, price, id, available });
     localStorage.setItem('view', JSON.stringify(item))


  }
  
    render(){
      const {src,name,price,available,id} = this.props;

    return (
      <ErrorBoundary>
  
       <div className="items-picture">

             <img src={src} alt="img"/>      
           <p className="product-title">{name}</p>
           <p className="product-price"><small>price: </small>${price}</p>
           <span className="product-qnty"> <small>Available : </small>{available}  </span>

           {
            
            (available ) ?
            <div>
              {/* view item */}

              <Link to="/view-item">
              <button className="btn btn-sm btn-warning" 
                onClick={()=>this.view(src,name,price,id,available)}>
                view
              </button>
              </Link>
            
            </div> : <p className="product-text-danger"> product is out of stock </p>
              
          }
                           
      </div>
      </ErrorBoundary>
  
     )
  
   }
  
  }
     
     

