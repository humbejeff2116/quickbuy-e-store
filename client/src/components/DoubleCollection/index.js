

import React from 'react';
import {Link} from 'react-router-dom'

import { DoubleCollectionItem} from './doubleCollection'








 export const DoubleCollection = ({data,title,href})=>
 
// double six div starts here 

   <div className="items six">
    {/* //     link to the items page  */}
    <div className="items-header">
            <h3>{title}</h3>
                <Link to={href}>See All</Link>
    </div>
        {/* //  display of sales items   */}
        <div className="sale-items">
        {
            data.map((product,i)=>
                < DoubleCollectionItem key ={i} {...product} />
                )
        }
        </div>
   </div>