
import React from 'react';

export default function FormGroup(props) {
    return(
        <>
        {
            (props.capitalize) ? 
            <div className="signup-form-group">
                <label>
                <input 
                type={props.type} 
                onBlur={ props.toggleBlur } 
                onInput={props.onInput} 
                className="form-control" 
                name={props.name} 
                onChange={props.handleInputChange}
                ref={props.ref}
                />
                <span className="placeholder">{props.placeholder}</span>
                </label>
            </div> : 
             <div className="signup-form-group">
                <label>
                <input 
                type={props.type} 
                onBlur={props.toggleBlur}  
                className="form-control" 
                name={props.name} 
                onChange={props.handleInputChange}
                ref={props.ref}
                />
                <span className="placeholder">{props.placeholder}</span>
                </label>
             </div>
        }
        </>
    )
}