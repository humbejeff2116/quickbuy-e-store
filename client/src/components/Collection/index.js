

import React from 'react';
import {CollectionItem} from './collection';
import { Link } from 'react-router-dom';
import './collection.css';




 export const Collection = (props)=>
    <div className="items">
    {/* // link to the page */}
        <div className="items-header">
                <h3>{props.title}</h3>
                <Link to={props.href}>See All</Link>
        </div>
        <div  className="sale-items">
        {(props.data.length ===0 )? <p>no data listed</p>:
            props.data.map( (product,i)=>
                < CollectionItem  key ={i} {...product} />

                )
        }
        
        </div>
    </div>
