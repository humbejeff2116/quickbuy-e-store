








import React,{useEffect} from 'react'
import './404.css';
import {PageTemplate} from '../PageTemplate/pageTemplate'

const Woops404 =({location})=>{
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

return(
    <PageTemplate>
    <div className="not-found">
<h2> Resource not found at </h2>
<h3>the link you entered is either broken or incorrect</h3>
</div>
</PageTemplate>

)

}

export default Woops404