









import React from 'react'
import {signup} from '../../services/ecormerce.service'
import './signup.css'
// import {PageTemplate} from '../PageTemplate/pageTemplate'


export default class Signup extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstname:'',
            lastname:'',
            email:'',
            phonenumber:'',
            password:'',
            password2:'',
            errMessage:''
        }
    }
    handleInputChange= (e) =>{
        this.setState({
            [e.target.name]:e.target.value
        });

    }
    handleSubmit =(e)=>{
        e.preventDefault();

        signup(this.state)
        .then(response => {
            if(response.status !== 200){
               return this.setState({
                    errMessage:response.message
                })
            }
         localStorage.setItem('x-access-token', response.data.token);
         localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
          return response.data
      })
      .then(token => window.location = '/')
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
           
          
            <div className="signup-form-container">
                {
                    (this.state.errMessage) && (<p>{this.state.errMessage}</p>)
                }
            <div className = "signup-form-panel">

                <div className="signup-form-panel-head">
                    <h3>sign up</h3>
                </div>

                <div className="signup-form-panel-body">

                    <form onSubmit={this.handleSubmit}>

                    <div className="signup-form-group">
                   
                    <input type="text" placeholder="Firstname" className="form-control" name="firstname" onChange={this.handleInputChange} />
                    </div>

                    <div className="signup-form-group">
                  
                    <input type="text" placeholder="Lastname" className="form-control" name="lastname" onChange={this.handleInputChange}  />
                    </div>

                    <div className="signup-form-group">
                   
                    <input type="email" placeholder="Example@gmail.com" className="form-control" name="email" onChange={this.handleInputChange}  />
                    </div>

                    <div className="signup-form-group">
                   
                    <input type="text" placeholder="Phone number" className="form-control" name="phonenumber" onChange={this.handleInputChange}  />
                    </div>

                    <div className="signup-form-group">
                  
                    <input type="password" placeholder="Password" className="form-control" name="password" onChange={this.handleInputChange}/>
                    </div>

                    <div className="signup-form-group">
                   
                    <input type="password" placeholder="Repeat Password" className="form-control" name="password2" onChange={this.handleInputChange} />
                    </div>

                    <button type="submit" className="btn btn-success"> Submit</button>

                    </form>

                </div>

            </div>
            </div>
           
          
        )
      

    }
}