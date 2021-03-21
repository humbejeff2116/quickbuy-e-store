import React,{useEffect} from 'react'
import {PageTemplate} from '../PageTemplate/pageTemplate';
import './404.css';





const Woops404 =({location}, props) => {
    useEffect(()=> {
        window.scrollTo(0,0)
    },[])

    return(
        <PageTemplate>
            <NotFound 
            containerClassName='not-found-container' 
            childClassName='not-found-content' 
            /> 
        </PageTemplate>
    )
}

export function NotFound(props) {
    return(
        <div className={props.containerClassName }  >
            <div className={props.childClassName}>
            <h2> Resource not found at  </h2>
            <h3>the link you entered is either broken or incorrect</h3>
            </div>
        </div>
    )
}
export default Woops404