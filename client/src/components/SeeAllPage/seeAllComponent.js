









import React from 'react';
import {Link} from 'react-router-dom'
import './seeAll.css'
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import logo from '../../images/logo.png'





   
//  the ProductItem component, which we will be used to render each product on the product list.
 const SeeAllComp =(props) => {
       
  const view = (src,name,price,description,id,available) => {
    let item =[];
      item.push({ src, name, price,description, id,available });
     localStorage.setItem('view', JSON.stringify(item));

  }

  const {src,name,price,description,available,id} = props
 
        return (
          <ErrorBoundary>

            <div className="all-items-picture"  onClick={()=>view(src,name,price,description,id,available)} >
              
                <div className="see-all-items-details">
                <Link to="/view-item">
                <img src={logo} width="80%" height="80%" alt="img"/><br />            
                <span className="product-title"><small>Name: {name}</small></span><br />
                <span className="product-price"><small>Price: ${price}</small></span><br />
                </Link>
                </div> 
                { 
                  (!available) ?

                  <div className="product-bttn">
                  <p className="product-text-danger"> 
                    *Out of stock* 
                  </p>
                  </div> : <div className="product-bttn">
                              <Link to="/view-item" >
                                <button  onClick={()=>view(src,name,price,description,id,available)} >
                                    {/* <i> <FaRegEye className="contact-bttn-icon"/></i> */}
                                  View 
                                </button>
                              </Link>
                              </div> 

                } 

            </div>
            </ErrorBoundary>

        )

    

}
export default SeeAllComp;






    








