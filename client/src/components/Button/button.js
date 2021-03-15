




import React from 'react'


export default function Button(props){
    return(

        <div className = {props.divClassName}>
            <button type="submit" className={props.buttonClassName ? props.buttonClassName :''} >
               {props.buttonText}
            </button>
        </div>
    )
}