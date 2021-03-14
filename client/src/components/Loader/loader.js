















import React from 'react';
import './loader.css'

export const PageLoader =()=>
<div className="loader-container" id="loader">
<div className="loader"></div>
</div>

export function Loader(props){
    return(

        <div className="page-loader-container" >
        <div className="page-loader"></div>
        </div>

    )
}
