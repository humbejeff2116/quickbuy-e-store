

import React from 'react';
import ViewThumbnails from './viewThumbnails';
import ViewAddButton from './viewAddButton';
import ViewProductSize from './viewProductSize'



export default function ViewItemCard(props) {
    return (
        <>
        {/* flex row */}
        <div  className="view-info">
            <div className="view-product-img" >
            <image src={props.src} width="80%" height="80%" />
            </div>
            <div className="view-item-details">
                <span>{props.name}</span><br />
                <span>{props.price}</span>
                <div>
                    <p>{props.description}</p>
                </div>
            </div>
        </div>     
            {
                (props.thumbnails) && (                   
                    <div className="thumbnails">
                         {/*TODO... flex row */}
                        {
                            props.thumbnails.map((thumbnail, i)=>
                            <ViewThumbnails key={i} {...thumbnail}/>
                            )
                        }               
                    </div>
                )        
            }
        <div className="view-item-size-contr">
            {
                (props.productSize) && (                                                           
                        
                            props.productSize.map((size, i)=>
                            <ViewProductSize key={i} {...size}/>
                            )               
                )   
            }
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


