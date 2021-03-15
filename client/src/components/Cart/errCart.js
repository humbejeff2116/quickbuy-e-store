





import React from 'react'





export default function ErrCart(props){
    return(
        <>
        <div>
            <p>{props.err}</p>
        </div>
        <button onClick={props.getCart} >refresh cart</button>
        </>
    )
}