
   import React from 'react';
   import ErrorBoundary from '../ErrorBoundary/errorBoundary'
   import { Link,Redirect } from 'react-router-dom'
   import { login } from '../../services/ecormerce.service';
   import {PageTemplate} from '../PageTemplate/pageTemplate'
   import './login.css'

  

export default class Login extends React.Component{
     constructor(props) {
       super(props);
       this.state = { 
           email: '',
            password: '',
            valErrors:[],
            errMessage:'',
            blur:false,
            redirect:''
        }
     }

      handleInputChange = (e) => 
        this.setState({[e.target.name]: e.target.value})

      toggleBlur = (e) => {

        if(e.target.value.length > 0) {
        return e.target.classList.add('not-empty');
        }
       return e.target.classList.remove('not-empty')           
      }

      submitLogin = (e) => {
        e.preventDefault();
        const checkoutAction = localStorage.getItem('checkout-message');
        if(checkoutAction) {
            localStorage.removeItem('checkout-action')
        }
        login(this.state)
        .then( response => response.data)
        .then(loginData => {
            if(loginData.status !== 200) {
              if(loginData.message) {
                  return this.setState({
                          errMessage: loginData.message,
                          valErrors:[]
                        })
              }
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
        .then( token => {
          if(token) {
            return this.setState({
              redirect:'/'
            })
            // return window.location = '/'
          }
        })
        .catch( err => {
          console.error('error :'+ err)
        });
        
      }
   
     componentDidMount() {
        window.scrollTo(0,0);
        const checkoutMessage = localStorage.getItem('checkout-message');
        const authMessage = localStorage.getItem('route-auth-message');
        if(checkoutMessage) {
          alert(checkoutMessage)
        }
        if(authMessage) {
          alert(authMessage);
        }    
     }
     componentWillUnmount() {
        const checkoutMessage = localStorage.getItem('checkout-message');
        const authMessage = localStorage.getItem('route-auth-message');
        if(checkoutMessage){
          localStorage.removeItem('checkout-message');
          
        }
        if(authMessage) {
          localStorage.removeItem('route-auth-message');
        }
     }
     
     render() {
       if(this.state.redirect) {
         return(
           <Redirect to={this.state.redirect} />
         )
       }
       return ( 
          <PageTemplate>
          <ErrorBoundary>
          <div className="login-container">
            {
              (this.state.valErrors.length > 0) && (this.state.valErrors.map((err,i )=>
                <div key={i} className="login-err-cont" ><p className="err-login">{err.msg}</p></div>
                ))
            }
            {
              (this.state.errMessage ) && (<div className="login-err-cont" ><p className="err-login">{this.state.errMessage}</p></div>)
            }
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
          </div>
          </ErrorBoundary>
          </PageTemplate>
       )
     }
}