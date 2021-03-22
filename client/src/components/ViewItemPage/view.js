



import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ViewItemCard from './viewItemCard';
import {PageTemplate} from '../PageTemplate/pageTemplate';
import { Loader } from '../Loader/loader';
import './view1.css';
const cartIcon = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}  />




const viewDetails = [
    {
        src : "",
        name : "",
        price :"",
        description : "",
        id : "",
        available:"",
        thumbnails : [{ imageSrc:"" }, { imageSrc:"" } ,{ imageSrc:"" }]
    }
]

export function View(props) { 
    const [viewProduct, setViewProduct] = useState([]);
    const [loading, setLoading] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [mssg, setMssg] = useState(null);
    const [err, setErr] = useState(null);

    useEffect(()=> {
        const viewItem = localStorage.getItem('view')? JSON.parse(localStorage.getItem('view')) : [];
        setViewProduct(viewItem);
        window.scrollTo(0,0);
        ()=> {
            localStorage.removeItem('view');
        }
    },[]);

    const  handleInputChange = e => 
        setQuantity(e.target.value)

    const addToCart = (id) => {
        let buying_quantity;
        let stateQnty = quantity;
        let err;
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        if(stateQnty < 1) {
            err ='quantity is not expected to be less than 1';
            setErr(err);
            return;   
        }
        cart[id] = cart[id] ? cart[id] : 0;
        buying_quantity = cart[id] + parseInt(quantity, 10);
        cart[id] = buying_quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        setMssg('item added to cart sucessfully')
    }
    if((!err && viewProduct.length < 1) || loading) {
        return(
            <PageTemplate>
            <div className="view-container">
                <div className="view-item-container">
                <Loader/> 
                </div>
            </div>   
            </PageTemplate>
        )
    }
    return (
        <PageTemplate>
        <div className="view-container">
            {
                (err)  && ( 
                <div className="view-item-error"> <p>{err}</p></div> 
                )
            }
            {
               ( mssg) && ( 
               <div className="view-item-mssg" ><p  >{mssg}</p></div>
               )
            }
            <div className="view-item-container">
            {
                viewProduct.map((product, i)=>
                    <ViewItemCard 
                    key={i} 
                    {...product} 
                    quantity={quantity}
                    addToCart={addToCart} 
                    cartIcon={cartIcon} 
                    handleInputChange={handleInputChange}
                    setQuantity ={setQuantity}  
                    />
                )
            }
            </div>    
        </div>
        </PageTemplate>
    )
}