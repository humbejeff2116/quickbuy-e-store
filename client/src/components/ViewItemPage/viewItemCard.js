

import React from 'react';
import ViewThumbnails from './viewThumbnails';
import ViewAddButton from './viewAddButton';



export default function ViewItemCard(props) {
    return (
        <>
        {/* flex row */}
        <div  className="view-info">
            <div className="view-product-img" >
            <image src={props.src} width="80%" height="80%" />
            </div>
            <div className="view-item-details">
                <span>{props.name}</span>
                <span>{props.price}</span>
                <div>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>
        {/* flex row */}
        <div className="thumbnails">
            {
                (props.thumbnails) && (
                    props.thumbnails.map((thumbnail, i)=>
                    <ViewThumbnails key={i} {...thumbnail}/>
                    )
                )        
            }
        </div>
        <div className="view-item-size">

        </div>
        <div className="view-add-bttn">
            <ViewAddButton 
            addToCart={props.addToCart} 
            id={props.id}
            quantity={props.quantity} 
            cartIcon={props.cartIcon} 
            handleInputChange={props.handleInputChange}
            setQuantity={props.setQuantity}  
            />
        </div>
        </>
    )
}