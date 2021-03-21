import React, {useEffect,useState}  from 'react';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import { Link } from 'react-router-dom';
import { PageLoader } from '../Loader/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const user1 = <FontAwesomeIcon  icon={['fas', "user"]}   />



export default function Dashboard(props) {
    useEffect(()=>{
        window.scrollTo(0,0); 
    },[]);
  
    return(   
        <ErrorBoundary>
        <div className="users-container">
            <section className="user-section">    
                <div>
                    <h2>
                    user dashboard
                    </h2>
                </div>
                <div className=" users-panel">
                </div>
            </section>
        </div>
        </ErrorBoundary>    
    )
}