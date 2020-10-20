


import React from 'react';
import { Link } from 'react-router-dom';
import { SingleCollectionItem} from './singleCollection'






 export const SingleCollection = ({data,title,href})=>
    // single six div starts here
    <div className="items">
    {/* //link to the items page  */}
        <div className="items-header">
        <h3>{title}</h3>
        
                <Link to={href}>See All</Link>
        </div>
            {/* // display of sales items   */}
            <div className="sale-items">
            {
                data.map((product,i)=>
                < SingleCollectionItem key ={i} {...product} />
                )
            }
            </div>
    </div>
// single six div ends here