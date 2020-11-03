
















   import React from 'react';
   import ErrorBoundary from '../ErrorBoundary/errorBoundary'
   import { Link } from 'react-router-dom'
   import { login } from '../../services/ecormerce.service';
   import {PageTemplate} from '../PageTemplate/pageTemplate'
   import './login.css'
  

//   This component gets the username and password, passes it on to the backend server when the form is submitted,
//  using the login method from the repository module, 
//    and redirects the user to the home URL upon a successful request.

export default class Login extends React.Component{

     constructor(props) {

       super(props);
       this.state = { 
           name: '',
            password: '',
            errMessage:''
        }

     }

     handleInputChange = (e) => 

               this.setState({[e.target.name]: e.target.value})

     submitLogin = (e) => {

       e.preventDefault();

       login(this.state)
       .then(response => {
         if(response.status !== 200){
           return this.setState({
             errMessage: response.message
           })
         }
        localStorage.setItem('x-access-token', response.token);
        localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
        localStorage.setItem('user',JSON.stringify(response.data));
         return response.data
     })
     .then(token => window.location = '/')
     .catch(err => {
       Promise.reject('Authentication Failed!');
       console.error(err)
      });
        
       

     }
     componentDidMount() {
       window.scrollTo(0,0)
     }
     componentDidUpdate(prevProps, prevState) {
      //  window.scrollTo(0,0)
     }
     
     

     render() {

        return (
          <PageTemplate>
         
          <ErrorBoundary>

         <div className="login-container">
           {
             (this.state.errMessage ) && (<p>{this.state.errMessage}</p>)

           }

           <div className="col-sm-8 col-sm-offset-2">

             <div className="login-panel ">

               <div className="login-panel-heading"><h2>Login </h2></div>

               <div className="login-panel-body">

                 <form onSubmit={this.submitLogin} autoComplete="none">

                   <div className="login-form-group">

                  

                     <input type="text" className="login-form-control" name="email" onChange={this.handleInputChange}placeholder="Email or phone number"/>

                   </div>

                   <div className="login-form-group">

                    
                     <input type="password" placeholder="Password" className="login-form-control" name="password" onChange={this.handleInputChange}/>

                   </div>
                   <div className="login-forgot-pass">
                     <p>forgot your password?</p>
               
                  </div>

                   <button type="submit" className="btn btn-success">Submit</button>

                 </form>
                 <div className="signup-link">
                   <p>dont have an account? <span><Link to="/signup" > sign up </Link></span></p>
                 </div>


               </div>

             </div>

           </div>

         </div>
         </ErrorBoundary>
         </PageTemplate>
        

       );

     }

   }
   
 