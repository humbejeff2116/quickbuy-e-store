



import React from 'react';

export default function ViewProductSize(props) {
    return(
        <span onClick={()=>props.setSize(props.size)} className="view-item-size">
            {props.size}
        </span>

    )
}