



import React from 'react';

export default function ViewProductSize(props) {
    return(
        <span onClick={()=>props.setSize(props.size)} 
        className={(props.selectedSize === props.size) ?"view-item-size item-selected":"view-item-size "}
        >
            {props.size}
        </span>

    )
}