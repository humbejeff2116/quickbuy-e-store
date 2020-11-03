















import React from 'react'
import { Route,Switch} from 'react-router-dom'
import Login from './login'

import {PageTemplate} from '../PageTemplate/pageTemplate'
import Woops404 from './404/404';
// import {Header} from '../Header/index'







 const LoginPage = ({match})=> 
 <PageTemplate>
     {/* <Header/> */}
  

    <>
    {/* <Route component={Login}/>  */}
    {/* <Switch> */}
    <Route exact path="/login" component={Login} />
   
    {/* <Route path="*"><Woops404 /></Route> */}
    {/* </Switch> */}
    </>
    </PageTemplate>


export default LoginPage