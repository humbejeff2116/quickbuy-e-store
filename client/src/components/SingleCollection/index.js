import React from 'react';
import { Link } from 'react-router-dom';
import { SingleCollectionItem} from './singleCollection';




 export const SingleCollection = ({data, title, href}) =>
    <div className="items">
        <div className="items-header">
            <h3>{title}</h3>
            <Link to={href}>See All</Link>
        </div>
        <div className="sale-items">
        {
            data.map((product, i)=>
            < SingleCollectionItem key ={i} {...product} />
            )
        }
        </div>
    </div>