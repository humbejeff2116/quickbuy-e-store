





import React from 'react'
import { useHistory } from 'react-router-dom';





export default function BackButton(props) {
    let history = useHistory();
    return(
        <div className={props.buttonDivClassName} >
            <i>{props.buttonIcon}</i><button onClick={()=>history.goBack()} > go back </button>
        </div>      
    )
}