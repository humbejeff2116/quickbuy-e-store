










import React from 'react'
import { Route,Redirect,Switch} from 'react-router-dom'
import Dashboard from './dashboard'
import {DashboardTemplate} from './dashboardTemplate';
import {isAuthenticated} from '../../services/ecormerce.service';
import RequireAuthentication from '../AuthHoc/authenticate';
import Woops404 from './Dash404/dash404';






 const DashboardRoute = ({match})=> {
    

   return(
       <DashboardTemplate>  
    
      
        <Switch>
        <Route exact path="/users/dashboard" component={Dashboard}/> 
        <Route path="*" component={Woops404}/>
        </Switch>

    
  
    </DashboardTemplate>

   )


}
 function auth(){
     return 1;

 }

 export const DashboardPage = RequireAuthentication(DashboardRoute,auth);