
import React from 'react';
import ViewAddButton from './viewAddButton';
import ViewProductSize from './viewProductSize';



export default function ViewItemCard(props) {
   
    return (
        <>
        <div  className="view-info">
            <div className="view-product-img" >
                <div className="view-img">
                <img src={props.src} width="100%" height="100%" alt="viewed item"/>
                </div>         
            </div>
            <div className="view-item-details-cntr">
            <div className="view-item-details">
                <p><span>Name:</span>  {props.name}</p>
                <p><span>Price:</span> ${props.price}</p>
                <div>
                    <p><span>Description:</span> {props.description}</p>
                </div>
            </div>
            </div>   
        </div>     
           
        <div className="view-item-size-contr">
            <div className="view-item-size-title">
                <h4>size</h4>
            </div>
            <div  className="view-item-size-panel">
            {                                                                                 
                props.productSizes.map((size, i) =>
                    <ViewProductSize key={i} 
                    {...size}
                    setSize ={props.setSize}
                    selectedSize={props.selectedSize} 
                    />                         
                )   
            }
            </div>   
        </div>
        <div className="view-add-bttn">
            <ViewAddButton 
            addToCart={props.addToCart} 
            id={props.id}
            src={props.src}
            price={props.price}
            name={props.name}
            setErr={props.setErr}
            setErrMssg={props.setErrMssg}
            setMssg={props.setMssg}
            setCartMssg={props.setCartMssg}
            quantity={props.quantity} 
            size={props.selectedSize}
            cartIcon={props.cartIcon} 
            handleInputChange={props.handleInputChange}
            setQuantity={props.setQuantity} 
            />
        </div>
        </>
    )
}