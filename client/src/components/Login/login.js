
















   import React from 'react';
   import ErrorBoundary from '../ErrorBoundary/errorBoundary'
   import { Link } from 'react-router-dom'
   import { login } from '../../services/ecormerce.service';
   import {PageTemplate} from '../PageTemplate/pageTemplate'
   import './login.css'
   import axios from 'axios';
  

//   This component gets the username and password, passes it on to the backend server when the form is submitted,
//  using the login method from the repository module, 
//    and redirects the user to the home URL upon a successful request.

export default class Login extends React.Component{

     constructor(props) {

       super(props);
       this.state = { 
           email: '',
            password: '',
            valErrors:[],
            errMessage:'',
            blur:false,
        }

       


     }

     handleInputChange = (e) => 

               this.setState({[e.target.name]: e.target.value})

    toggleBlur =(e)=>{

      if(e.target.value.length > 0 ) {

       return e.target.classList.add('not-empty');
     
      }

       return e.target.classList.remove('not-empty')
                
    }

     submitLogin = (e) => {
      // window.scrollTo(0,0)

       e.preventDefault();
       const checkoutAction = localStorage.getItem('checkout-action');
       if(checkoutAction){
         localStorage.removeItem('checkout-action')
       }

       axios.post(`api/v1/login`, { email: this.state.email, password: this.state.password })
       .then(response=>{
       
        console.log(response.data);
       return response.data;
       
       })
       .then(loginData => {
       
        
         if(loginData.status !== 200){
           if(loginData.message){
            return this.setState({

              errMessage: loginData.message,
              valErrors:[]
            })

           }

           console.log(loginData.valErrors);
           return this.setState({
             valErrors:loginData.valErrors,
             errMessage:''
           })

         }
        localStorage.setItem('x-access-token', loginData.token);
        localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
        localStorage.setItem('user',JSON.stringify(loginData.data));
         return loginData;
     })
     .then(token =>{
       if(token){
        return window.location = '/'
       }
     })
     .catch(err => {
      //  Promise.reject('Authentication Failed!');
       console.error('error :'+ err)
      });
        
       

     }
   
     componentDidMount() {
    
       window.scrollTo(0,0);
      const checkoutAction = localStorage.getItem('checkout-action');
      if(checkoutAction){
        alert(checkoutAction)

      }
     
     

  
     }
     componentWillUnmount(){
      const checkoutAction = localStorage.getItem('checkout-action');
       if(checkoutAction){
        localStorage.removeItem('checkout-action');
         
       }

     

     }
    

     render() {
    
        return (
          <PageTemplate>
         
          <ErrorBoundary>

         <div className="login-container">
           {
             (this.state.valErrors.length > 0) && (this.state.valErrors.map((err,i)=>
              <div key={i} className="login-err-cont" ><p className="err-login">{err.msg}</p></div>
              ))
           }
           {
             (this.state.errMessage ) && (<div className="login-err-cont" ><p className="err-login">{this.state.errMessage}</p></div>)

           }

           {/* <div className="col-sm-8 col-sm-offset-2"> */}

             <div className="login-panel ">

               <div className="login-panel-heading">
                 <h2>Login </h2>
                </div>

               <div className="login-panel-body">

                 <form action="login" onSubmit={this.submitLogin} method="POST" autoComplete="off">
                

                   <div className="login-form-group">
                   <label >
                     <input type="text"   name="email" onBlur={  this.toggleBlur } onChange={this.handleInputChange}/>
                     <span className="placeholder">Email Address</span>
                     </label>

                   </div>

                   <div className="login-form-group">
                   <label > 
                     <input type="password" name="password" onBlur={ this.toggleBlur } onChange={this.handleInputChange}/>
                     <span className="placeholder">Password</span>
                     </label>
                     </div>

                   <div className="login-forgot-pass">
                     <p>forgot your password?</p>
               
                  </div>

                  <div>
                   <button type="submit" className="btn btn-success">Submit</button>
                   </div>

                 </form>
                 <div className="signup-link">
                   <p>dont have an account? <span><Link to="/signup" > sign up </Link></span></p>
                 </div>


               </div>

             </div>

           {/* </div> */}

         </div>
         </ErrorBoundary>
         </PageTemplate>
        

       );

     }

   }
   
 