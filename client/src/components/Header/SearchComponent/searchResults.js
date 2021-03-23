








import React from 'react';
import {Link} from 'react-router-dom';
import './searchResult.css';

const SearchResult = (props) => {
    const {name, description} = props;
    return(
        <div className="search-result-container">
            <section className="search-results">
                <Link to="/view">
                <p>{name}</p>
                <span>{description}</span>
                </Link>
            </section>
        </div>       
    )   
}
export default SearchResult;