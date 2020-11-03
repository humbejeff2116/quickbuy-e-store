










import React from 'react';
import {Link,Redirect} from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary/errorBoundary';
import { PageLoader } from '../Loader/loader';
import {PageTemplate} from '../PageTemplate/pageTemplate'
import Login from '../Login/login';
import './auth.css';


export default function RequireAuthentication(Component,auth){
    class AuthenticatedComponent extends React.Component{
     
        render(){
            const isAuthenticated = auth();
            

            if (!isAuthenticated){

                return(
                    <PageTemplate>

                    <div className="auth-container">
                        <div className="auth">
                        <div className="auth-header">
                        <h2> you must be logged in to visit this page </h2>
                        </div>

                        <div className="auth-body">
                           <button><Link to="/login">login</Link></button> 

                        </div>
                        </div>  
                    </div>  
                    </PageTemplate>
                )

            }

            return(
               
                <>
                {
                     <Component {...this.props}/>

                }
                </>
              
               

            )

        }
    }
    return AuthenticatedComponent;
}