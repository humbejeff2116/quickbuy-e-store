

import React from 'react';
import {CollectionItem} from './collection';
import { PageLoader } from '../Loader/loader';
import { Link } from 'react-router-dom';
import './collection.css';


 export const Collection = (props) =>
    <div className="items">
        <div className="items-header">
            <h3>{props.title}</h3>
            <Link to={props.href}>See All</Link>
        </div>
        <div  className="sale-items">
            {(props.data.length === 0) ? < PageLoader/> :
                props.data.map( (product, i) =>
                    < CollectionItem  key ={i} {...product} />
                    )
            }
        </div>
    </div>