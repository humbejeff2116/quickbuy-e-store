









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
    toggleBlur =(e)=>{

        if(e.target.value.length > 0 ) {
  
         return e.target.classList.add('not-empty');
       
        }
  
         return e.target.classList.remove('not-empty')
                  
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
    capitalize =(e)=>{

        if( (e.target.name === 'firstname') && (e.target.value) ){
           
              let inpt = e.target.value;
              let inptArr =inpt.toLowerCase().split();
                let capArr = inptArr.map(text => text[0].toUpperCase() + text.substring(1))
                return e.target.value =  capArr.join('');
           
        } else if( (e.target.name === 'lastname') && (e.target.value) ){
           
            let inpt2 = e.target.value;
            let inptArr2 =inpt2.toLowerCase().split();
              let capArr2 = inptArr2.map(text => text[0].toUpperCase() + text.substring(1))
              return e.target.value =  capArr2.join('');
         
      }
    

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
              <div key={i} className="signup-err-cont" > <p className="signup-err"> {err.msg} </p></div>
              ))
           }
           {
             (this.state.errMessage ) && (<div className="signup-err-cont" ><p className="signup-err">{this.state.errMessage}</p></div>)

           }

            <div className = "signup-form-panel">

                <div className="signup-form-panel-head">
                    <h2>sign up</h2>
                </div>

                <div className="signup-form-panel-body">

                    <form onSubmit={this.handleSubmit} method="POST" autoComplete="off" >

                    <div className="signup-form-group">
                    <label>
                    <input type="text" onBlur={ this.toggleBlur }  onInput ={this.capitalize}  name="firstname" onChange={this.handleInputChange} />
                    <span className="placeholder">Firstname</span>
                    </label>
                    </div>

                    <div className="signup-form-group">
                    <label>
                    <input type="text" onBlur={ this.toggleBlur }  onInput ={this.capitalize}  className="form-control" name="lastname" onChange={this.handleInputChange}  />
                    <span className="placeholder">Lastname</span>
                    </label>
                    </div>

                    <div className="signup-form-group">
                    <label>
                    <input type="text" onBlur={ this.toggleBlur } className="form-control" name="email" onChange={this.handleInputChange}  />
                    <span className="placeholder">Email Address</span>
                    </label>
                    </div>

                    <div className="signup-form-group">
                    <label>
                    <input type="text" onBlur={ this.toggleBlur } className="form-control" name="phonenumber" onChange={this.handleInputChange}  />
                    <span className="placeholder">Phone Number</span>
                    </label>
                    </div>

                    <div className="signup-form-group">
                    <label>
                    <input type="password" onBlur={ this.toggleBlur } className="form-control" name="password" onChange={this.handleInputChange}/>
                    <span className="placeholder">Password</span>
                    </label>
                    </div>

                    <div className="signup-form-group">
                    <label>                  
                    <input type="password" onBlur={ this.toggleBlur } className="form-control" name="password2" onChange={this.handleInputChange} />
                    <span className="placeholder">Repeate Password</span>
                    </label>
                    </div>

                    <div className="signup-bttn">
                    <button type="submit" className="btn btn-success"> Submit</button>
                    </div>

                    </form>

                </div>

            </div>
            </div>
            </PageTemplate>
           
          
        )
      

    }
}