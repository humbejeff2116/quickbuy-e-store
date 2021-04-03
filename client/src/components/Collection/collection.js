
import React,{useState} from 'react';
import ErrorBoundary from '../ErrorBoundary/errorBoundary'
import logo from '../../images/logo.png'
import { Redirect, useLocation, useHistory} from 'react-router-dom/';


  export function CollectionItem(props) {
    let location = useLocation();
    let history = useHistory();
    
    const [redirect, setRedirect] = useState('');
    const {src, name, price, description, available, id} = props;
   
    const view = (src, name, price, description, id, available) => { 
      history.push(location.pathname);
      let item = [];
      item.push({ src, name, price,description, id,available });
      localStorage.setItem('view', JSON.stringify(item));
      setRedirect('/view-item');
    }
    if(redirect){
      return(
        <Redirect to={redirect} />
      )
    }
    return(
      <ErrorBoundary>  
      <div className="items-picture"  onClick={()=>view(src,name,price,description,id,available)} > 
          <div className="items-details"> 
              <img src={logo} width="80%" height="80%" alt="img" /><br />      
             <span className="product-title">name:</span> {name}<br />
             <span className="product-price">price:</span> ${price}<br />
          </div> 
          { 
            (!available) ?
            <div className="product-bttn">
              <p className="product-text-danger"> 
                *Out of stock* 
              </p>
            </div> : <div className="product-bttn">
                          <button  onClick={()=>view(src,name,price,description,id,available)} >
                              {/* <i> <FaRegEye className="contact-bttn-icon"/></i> */}
                            View 
                          </button>
                      </div> 
          } 
      </div>
      </ErrorBoundary>
    )
  } 