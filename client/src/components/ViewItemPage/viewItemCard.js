

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
                <div className="view-img">
                <image src={props.src} width="80%" height="80%" />
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
            </div>

            <div className="view-item-details-cntr">
            <div className="view-item-details">
                <p> Name: {props.name}</p>
                <p>Price: ${props.price}</p>
                <div>
                    <p>Description: {props.description}</p>
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
                (props.productSize) && (                                                                                  
                            props.productSize.map((size, i)=>
                                <ViewProductSize key={i} 
                                {...size}
                                setSize ={props.setSize} 
                                />
                            )               
                )   
            }
            </div>
            
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


