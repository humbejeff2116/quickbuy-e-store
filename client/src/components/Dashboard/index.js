import React from 'react';
import { Route,Redirect,Switch} from 'react-router-dom'
import Dashboard from './dashboard';
import {DashboardTemplate} from './dashboardTemplate';
import {isAuthenticated} from '../../services/ecormerce.service';
import RequireAuthentication from '../AuthHoc/authenticate';
import { NotFound } from '../404/woops404';
import './dashboard.css';



 const DashboardRoute = ({match}) => {
   return(
       <DashboardTemplate>  
        <Switch>
          <Route exact path="/users/dashboard" component={Dashboard}/> 
          <Route path="*" >
            <NotFound containerClassName='container-dash404' childClassName='not-found-dash' />
          </Route>
        </Switch>
      </DashboardTemplate>
   )
}
 export const DashboardPage = RequireAuthentication( DashboardRoute, isAuthenticated );