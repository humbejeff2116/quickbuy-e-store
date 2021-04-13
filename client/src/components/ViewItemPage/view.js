



import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ViewItemCard from './viewItemCard';
import {PageTemplate} from '../PageTemplate/pageTemplate';
import { Loader } from '../Loader/loader';
import ViewAlertBox from './viewModalBox';
import {ViewOkAlertBox} from './viewModalBox';
import BackButton from '../BackButton/backButton';
import './view.css';
const cartIcon = <FontAwesomeIcon  icon={['fas', "shopping-cart"]}  />




const viewDetails = [
    {
        src : "/",
        name : "gucci shirt",
        price :"200",
        description : "latest gucci model 2021 prad shirt for men",
        id : "3",
        available:true,
        thumbnails : [{ imageSrc:"/hjghfg" }, { imageSrc:"/gfgdf" }, { imageSrc:"/fdfdf" }],
        productSizes: [{size:10}, {size:20}, {size:15}]
    }
]

export function View(props) { 
    const [viewProduct, setViewProduct] = useState([]);
    const [loading, setLoading] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState('');
    const [mssg, setMssg] = useState(false);
    const [cartMssg, setCartMssg] = useState('');
    const [err, setErr] = useState(false);
    const [errMssg, setErrMssg] = useState('');


    useEffect(()=> {
        const viewItem = localStorage.getItem('view')? JSON.parse(localStorage.getItem('view')) : [];
        setViewProduct(viewDetails);
        window.scrollTo(0,0);
       return ()=> {
            localStorage.removeItem('view');
        }
    },[]);

    const  handleInputChange = e => {
        if(e.target.value && (!isNaN(e.target.value)) ) { 
           return setQuantity(parseInt(e.target.value));
        }
        if(isNaN(e.target.value)) {
            setErr(true);
            setQuantity(1);
            return setErrMssg('quantity is expected to be a number')       
        }
        return setQuantity(parseInt(e.target.value))       
    }
      

    const addToCart = (id) => {
        let buying_quantity;
        let productQnty = quantity;
        let errMssg;
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        if(productQnty < 1) {
            errMssg ='quantity should not be less than 1';
            setErr(true);
            setErrMssg(errMssg)
            return;   
        }
        if(!size) {
            errMssg ='please select a particular size';
            setErr(true);
            setErrMssg(errMssg)
            return;   
        }
        if(size) {
            setErr(false);
            setErrMssg('')
        }
        if(isNaN(productQnty)) {
            errMssg ='please key in a quantity of your choice';
            setErr(true);
            setErrMssg(errMssg)
            return;
        }
        cart[id] = cart[id] ? cart[id] : 0;
        buying_quantity = cart[id] + parseInt(quantity, 10);
        cart[id] = buying_quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        setMssg(true);
        setErr(false);
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
                <BackButton buttonDivClassName="view-back-bttn"/>
                <div className="view-item-container">
                    <Loader/> 
                </div>               
                <div className="view-item-alert">
                </div>
            </div>   
            </PageTemplate>
        )
    }
    return (
        <PageTemplate>
        <div className="view-container">
        <BackButton buttonDivClassName="view-back-bttn"/>
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
                    setSize ={setSize}
                    selectedSize={size}  
                    />
                )
            }
            </div>


            <div className="view-item-alert">
            {
            (err) && (
                <ViewAlertBox 
                show={err}
                hideModal={hideModal}
                message={errMssg}
                />
            )
        }
        {
            (mssg && !err) && (
                <ViewOkAlertBox
                show={mssg }
                hideModal={hideModal}
                message={cartMssg}
                />
            )
        }
            </div>    
        </div>
        </PageTemplate>
    )
}