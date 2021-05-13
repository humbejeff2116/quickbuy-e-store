
import React from 'react';
import { Link } from 'react-router-dom';
import { DoubleCollectionItem } from './doubleCollection';
import './doubleCollection.css';



 export const DoubleCollection = ({data, title, href}) =>
    <div className="items six">
        <div className="items-header">
            <h3>{title}</h3>       
            <Link to={href}>See All</Link>
        </div>
        <div className="six-sale-items">
            {
                data.map((product,i)=>
                    < DoubleCollectionItem key ={i} {...product} />
                    )
            }
        </div>
    </div>