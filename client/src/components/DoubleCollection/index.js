
import React from 'react';
import { Link } from 'react-router-dom';
import { DoubleCollectionItem } from './doubleCollection';
import { PageLoader } from '../Loader/loader';
import './doubleCollection.css';



 export const DoubleCollection = ({data, title, href}) =>
    <div className="items six">
        <div className="items-header">
            <h3>{title}</h3>       
            <Link to={href}>See All</Link>
        </div>
        <div className="six-sale-items">
            {(data.length === 0  ) ? < PageLoader/>:
                data.map((product,i)=>
                    < DoubleCollectionItem key ={i} {...product} />
                    )
            }
        </div>
    </div>