
import React from 'react';
import './searchResult.css';



const SearchResult = (props) => {
    const {src, name, price, description, available, id} = props;
    return(
            <section className={props.className} onClick={()=>props.onClick(src, name, price, description, id, available)}>
                <span>{name}</span>
                <span>{description}</span>  
            </section>        
    )   
}
export default SearchResult;