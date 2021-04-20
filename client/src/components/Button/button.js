import React from 'react';


export default function Button(props) {
    if (props.divClassName) {
        return(
            <div className ={props.divClassName}>
                <button type="submit" className={props.buttonClassName ? props.buttonClassName :''} >
                   {props.buttonText}
                </button>
            </div>
        )
    }
    return(
        <button type="submit" className={props.buttonClassName ? props.buttonClassName :''} >
            {props.buttonText}
        </button>
    )  
}