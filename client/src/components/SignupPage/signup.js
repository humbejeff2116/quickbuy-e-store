import React from 'react';
import {signup} from '../../services/ecormerce.service'
import {PageTemplate} from '../PageTemplate/pageTemplate'
import ApplicationData from '../../data/appData';
import FormRow from './formRow';
import Button from '../Button/button';
import './signup.css';


export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
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
    handleInputChange = (e) => {
        this.setState({ [e.target.name]:e.target.value });
    }

    toggleBlur = (e) => {
        if(e.target.value.length > 0 ) {
            return e.target.classList.add('not-empty');
        }
        return e.target.classList.remove('not-empty')             
    }

    handleSubmit = (e) => {
        window.scrollTo(0,0);
        e.preventDefault();
        signup(this.state)
        .then(response =>  response.data)
        .then(signupData => {
            if(signupData.status !== 200) {
                if(signupData.message) {
                    return this.setState({
                    errMessage: signupData.message,
                    valErrors:[]
                    });
                }
                return this.setState({
                  valErrors:signupData.valErrors,
                  errMessage:''
                });
            }
            localStorage.setItem('x-access-token', signupData.token);
            localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
            return signupData;
        })
        .then(token => {
            if(token) {
                return window.location = '/'
            }
        }) 
        .catch(err => {
            console.error(err)
        });
    }
    capitalize = (e) => {
        let inpt, inptArr, capArr;
        if((e.target.name === 'firstname') && (e.target.value)) {
            inpt = e.target.value;
            inptArr = inpt.toLowerCase().split();
            capArr = inptArr.map(text => text[0].toUpperCase() + text.substring(1))
            return e.target.value = capArr.join('');     
        } else if((e.target.name === 'lastname') && (e.target.value)) {
            inpt = e.target.value;
            inptArr = inpt.toLowerCase().split();
            capArr = inptArr.map(text => text[0].toUpperCase() + text.substring(1))
            return e.target.value =  capArr.join('');     
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
    }
     
    render() {
        const signUpFormData = ApplicationData.getSignupFormData();
        return(
            <PageTemplate>
            <div className="signup-form-container">
                {
                    (this.state.valErrors.length > 0) && ( 
                        this.state.valErrors.map((err,i)=>
                        <div key={i} className="signup-err-cont" > 
                            <p className="signup-err"> {err.msg} </p>
                        </div>
                    ))
                }
                {
                    (this.state.errMessage ) && (
                    <div className="signup-err-cont" >
                        <p className="signup-err">{this.state.errMessage}</p>
                    </div>
                    )
                }
                <div className = "signup-form-panel">
                    <div className="signup-form-panel-head">
                        <h2>Sign up</h2>
                    </div>
                    <div className="signup-form-panel-body">
                        <form onSubmit={this.handleSubmit} method="POST" autoComplete="off" >
                            {
                            signUpFormData.map((data, i) =>
                                < FormRow  key={i} 
                                {...data}
                                toggleBlur={this.toggleBlur}
                                handleInputChange={this.handleInputChange}
                                onInput={this.capitalize} 
                                />
                                )
                            }
                            <Button divClassName='signup-bttn' buttonClassName='btn' buttonText='Submit' />
                        </form>
                    </div>
                </div>
            </div>
            </PageTemplate>          
        )
    }
}