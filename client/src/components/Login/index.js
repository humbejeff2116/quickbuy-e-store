















import React from 'react'
import { Route,} from 'react-router-dom'
import Login from './login'
import Signup from '../SignupPage/signup'
import {PageTemplate} from '../PageTemplate/pageTemplate'
// import {Header} from '../Header/index'







 const LoginPage = ({match})=> 
 <PageTemplate>
     {/* <Header/> */}
  

    <>
    {/* <Route component={Login}/>  */}
    <Route exact path="/login" component={Login} />
    <Route path="/login/signup" component={Signup}/>
    </>
    </PageTemplate>


export default LoginPage