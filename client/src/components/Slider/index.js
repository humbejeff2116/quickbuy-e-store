


import React from 'react';
import {SlideShow, BreadCrumb} from './slider'
import './slider.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const search = <FontAwesomeIcon icon={['fas', "search"]}  />
export const MobileSearch = (props)=>
<div className="mobile-search">
<input type="search" placeholder="search clothing brands and collections"/>
<span className="mobile-search-icon"><i className="fa fa-search fa-lg">{search}</i></span>    
</div>


 export const Slider =(props)=>
    <div className="slider-container">
       
        <SlideShow />
        <BreadCrumb/>
    </div>