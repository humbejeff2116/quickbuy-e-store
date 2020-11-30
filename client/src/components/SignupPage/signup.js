









import React from 'react'
import {signup} from '../../services/ecormerce.service'
import {PageTemplate} from '../PageTemplate/pageTemplate'
import './signup.css'
// import {PageTemplate} from '../PageTemplate/pageTemplate'


export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            valErrors:[],
            firstname:'',
            lastname:'',
            email:'',
            phonenumber:null,
            password:null,
            password2:null,
            errMessage:''
        }
    }
    handleInputChange= (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });

    }
    handleSubmit =(e)=>{
           window.scrollTo(0,0);
        e.preventDefault();

        signup(this.state)
        .then(response=>{
            return response.data;
        })
        .then(signupData => {
            if(signupData.status !== 200){
                if(signupData.message){
                 return this.setState({
     
                   errMessage: signupData.message,
                   valErrors:[]
                 })
     
                }
     
                console.log(signupData.valErrors);
                return this.setState({
                  valErrors:signupData.valErrors,
                  errMessage:''
                })
     
              }
              console.log(signupData)
         localStorage.setItem('x-access-token', signupData.token);
         localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
          return signupData
      })
      .then(token =>{
        if(token){
            return window.location = '/'
           }
      }) 
      .catch(err => {
        Promise.reject('Authentication Failed!');
        console.error(err)
       });

    }
    componentDidMount() {
        window.scrollTo(0,0);
    }
    componentDidUpdate(prevProps, prevState) {
        // window.scrollTo(0,0);
    }
    
    
    render(){
        return(
            <PageTemplate>

           

           
          
            <div className="signup-form-container">
            {
             (this.state.valErrors.length > 0) && (this.state.valErrors.map((err,i)=>
              <div key={i} className="signup-err-cont" > {err.msg} </div>
              ))
           }
           {
             (this.state.errMessage ) && (<div className="signup-err-cont" ><p className="signup-err-login">{this.state.errMessage}</p></div>)

           }

            <div className = "signup-form-panel">

                <div className="signup-form-panel-head">
                    <h2>sign up</h2>
                </div>

                <div className="signup-form-panel-body">

                    <form onSubmit={this.handleSubmit} method="POST">

                    <div className="signup-form-group">
                   
                    <input type="text" placeholder="Firstname*" className="form-control" name="firstname" onChange={this.handleInputChange} />
                    </div>

                    <div className="signup-form-group">
                  
                    <input type="text" placeholder="Lastname*" className="form-control" name="lastname" onChange={this.handleInputChange}  />
                    </div>

                    <div className="signup-form-group">
                   
                    <input type="email" placeholder="Example@gmail.com*" className="form-control" name="email" onChange={this.handleInputChange}  />
                    </div>

                    <div className="signup-form-group">
                   
                    <input type="text" placeholder="Phone number*" className="form-control" name="phonenumber" onChange={this.handleInputChange}  />
                    </div>

                    <div className="signup-form-group">
                  
                    <input type="password" placeholder="Password*" className="form-control" name="password" onChange={this.handleInputChange}/>
                    </div>

                    <div className="signup-form-group">
                   
                    <input type="password" placeholder="Repeat Password*" className="form-control" name="password2" onChange={this.handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-success"> Submit</button>

                    </form>

                </div>

            </div>
            </div>
            </PageTemplate>
           
          
        )
      

    }
}