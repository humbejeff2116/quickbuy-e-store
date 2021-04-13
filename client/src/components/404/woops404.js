import React,{useEffect} from 'react'
import {PageTemplate} from '../PageTemplate/pageTemplate';
import './404.css';


const Woops404 =( props) => {
    const address = window.location.href;
    useEffect(()=> {
        window.scrollTo(0,0)
    },[])

    return(
        <PageTemplate>
            <NotFound 
            containerClassName='not-found-container' 
            childClassName='not-found-panel'
            address={address} 
            /> 
        </PageTemplate>
    )
}

export function NotFound(props) {
    return(
        <div className={props.containerClassName }>
            <div className={props.childClassName}>
                <div className='not-found-content'>
                    <h2> Resource not found  </h2>
                    <h4> Address: "{ props.address}" </h4>
                    <p>the link you entered is either incorrect, broken or has been removed</p>
                </div>          
            </div>
        </div>
    )
}
export default Woops404