
import React from 'react';
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const search = <FontAwesomeIcon icon={['fas', "search"]}  />


export const MobileSearch = (props) =>
    <div className="mobile-search">
        <input type="search"  ref={props.searchValue} onKeyUp={props.searchProducts} placeholder="search clothing..."/>
        <span className="mobile-search-icon"  onClick= {props.searchProducts}><i className="fa fa-search fa-lg">{search}</i></span>    
    </div>

