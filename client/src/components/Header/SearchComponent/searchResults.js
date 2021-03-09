








import React from 'react';
import {Link} from 'react-router-dom'

const SearchResult = (props) =>{

    const {name,description} = props;
    return(

        <div className="search-results">
            <Link to="/view">
            <p>{name}</p>
            <span>{description}</span>
            </Link>

        

        </div>

    )

    
}

export default SearchResult;