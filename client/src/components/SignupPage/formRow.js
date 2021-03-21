import React from 'react';
import FormGroup from './formGroup';



export default function FormRow(props) {
    return(
        <div className="form-row">
        {
            props.formInputs.map((inputs, i)=>
            <FormGroup key={i} {...inputs} 
            toggleBlur={props.toggleBlur} 
            handleInputChange={props.handleInputChange} 
            onInput={props.onInput}  />
            )
        }
        </div>
    )
}