import React from 'react';
import './loader.css'





export const PageLoader = ( ) =>
    <div className="loader-container" id="loader">
        <div className="loader"></div>
    </div>

export function Loader( ) {
    return(
        <div className="page-loader-container" >
            <div className="page-loader"></div>
        </div>
    )
}


export  function Loader2( ) {
    return (
        <div className="cloud-Loader-container">
            <div className="help"></div>     
        </div>
    )
}