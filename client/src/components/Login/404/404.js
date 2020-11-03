








import React,{useEffect} from 'react'
import './404.css';


const Woops404 =({location})=>{
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

return(

    <div className="container-404" >
    <div className="not-found-login">
    <h2> Resource not found at  </h2>
    <h3>the link you entered is either broken or incorrect</h3>
    </div>
    </div>

)

}

export default Woops404