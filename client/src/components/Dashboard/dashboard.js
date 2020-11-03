








import React, {useEffect,useState}  from 'react';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import { Link } from 'react-router-dom';
import { PageLoader } from '../Loader/loader';
import './dashboard.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const user1 = <FontAwesomeIcon  icon={['fas', "user"]}   />





export default function Dashboard(){
  


    useEffect(()=>{
        // setLoading(true);
        window.scrollTo(0,0);
        // return ()=>{
        //    setLoading(false);
        // }
    },[]);
  

    return(
      
        <ErrorBoundary>
            
            {/* { (loading) && (<PageLoader/>) } */}
      {/* side navigation here */}
    <div className="users-container">
        <section className="user-section">
        
<div>
    <h2>
      users dashboard
    </h2>

</div>




<div className=" users-panel">
{/* <%users.forEach(user=> { %>
  
    <div class="users-heading">
        <a href="/users/<%=user.username%>/">
            <%= user.displayName() %>
        </a>
    </div>
    <% if(user.bio){ %>
        <div class="users-body">
            <%= user.bio %>
        </div>
    <% } %>
<% }) %> */}

</div>

    </section>




            </div>
        </ErrorBoundary>

       
    )

}