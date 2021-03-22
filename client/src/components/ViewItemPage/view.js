



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
    const [mssg, setMssg] = useState(false);
    const [cartMssg, setCartMssg] = useState('');
    const [err, setErr] = useState(false);
    const [errMssg, setErrMssg] = useState('');


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
        let errMssg;
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        if(stateQnty < 1) {
            errMssg ='quantity is not expected to be less than 1';
            setErr(true);
            setErrMssg(errMssg)
            return;   
        }
        cart[id] = cart[id] ? cart[id] : 0;
        buying_quantity = cart[id] + parseInt(quantity, 10);
        cart[id] = buying_quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        setMssg(true);
        setCartMssg('item added to cart sucessfully');
    }

    const hideModal = ( ) => {
         setErr(false);
         setMssg(false);
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
            (err) && (
                <AlertBox show = {err} handleClose={hideModal}>
                    <div className="modal-header">
                        <span className="close" onClick={hideModal}> &times; </span>
                    </div>
                    <div className="modal-content">
                        <p> {errMssg} </p>
                        <p> Please wait and try again.</p>
                    </div>
                </AlertBox>
            )
        }
        {
            (mssg) && (
                <AlertBox show = {mssg} handleClose={hideModal}>
                    <div className="modal-header">
                        <span className="close" onClick={hideModal}> &times; </span>
                    </div>
                    <div className="modal-content">
                        <p> {cartMssg} </p>
                    </div>
                </AlertBox>
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