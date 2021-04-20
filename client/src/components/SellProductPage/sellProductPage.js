
import React,{useEffect} from 'react';
import './sellProduct.css';




export const SellProductPage = (props) => {
    useEffect(()=> {
        window.scrollTo(0,0)
    },[]);
    return(
        <div className="sell-product-container">
            <div className="sell-product-header">
                <h3>sell a product</h3>
            </div>
            <div className="sell-product-body">
            </div>  
        </div>
    )
}