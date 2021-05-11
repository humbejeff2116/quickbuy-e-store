
import React from 'react';
import { signup } from '../../services/ecormerce.service';
import { PageTemplate } from '../PageTemplate/pageTemplate';
import Button from '../Button/button';
// import BackButton from '../BackButton/backButton';
// import { Redirect, useLocation, useHistory} from 'react-router-dom/';
import './signup.css';

// TODO... change Signup component from class to function and use the backbutton hook;
export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            valErrors: [],
           signingUp: false,
            firstname: '',
            lastname: '',
            email: '',
            phonenumber: null,
            password: null,
            password2: null,
            errMessage: '',
            firstNameError: '',
            lastNameError: '',
            emailError: '',
            phonenumberError: '',
            passwordError: '',     
        }    
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]:e.target.value });
    }

    toggleBlur = (e) => {
        if (e.target.value.length > 0 ) {
            return e.target.classList.add('not-empty');
        }
        return e.target.classList.remove('not-empty');            
    }

    handleSubmit = (e) => {
        // window.scrollTo(0,0);
        this.setState({
            signingUp:true
        });
        e.preventDefault();
        signup(this.state)
        .then(response => response.data)
        .then(signupData => {
            if (signupData.status !== 200) {
                this.setState({
                    signingUp:false
                });
                if (signupData.message) {
                    this.setState({
                        errMessage: signupData.message,
                        valErrors:[],
                        signingUp:false
                    });
                    window.scrollTo(0,0);
                    return;
                }

               let firstNameError = signupData.valErrors.filter(err => err.param === "firstname");
               let lastNameError = signupData.valErrors.filter(err => err.param === "lastname");
               let emailError = signupData.valErrors.filter(err => err.param === "email");
               let phonenumberError = signupData.valErrors.filter(err => err.param === "phonenumber");
               let passwordError = signupData.valErrors.filter(err => err.param === "password");
        
                 this.setState({
                  valErrors:signupData.valErrors,
                  signingUp:false,
                  errMessage:'',
                  firstNameError,
                  lastNameError,
                  emailError,
                  phonenumberError,
                  passwordError,
                });
                window.scrollTo(0,0);
                return;
            }
            localStorage.setItem('x-access-token', signupData.token);
            localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
            return signupData;
        })
        .then(token => {
            if  (token) {
                this.setState({
                    signingUp:false,
                });
                return window.location = '/'
            }
        }) 
        .catch(err => {
            console.error(err);
            this.setState({
                signingUp:false,
            });
        });
    }
    capitalize = (e) => {
        let inpt, inptArr, capArr;
        if ((e.target.name === 'firstname') && (e.target.value)) {
            inpt = e.target.value;
            inptArr = inpt.toLowerCase().split();
            capArr = inptArr.map(text => text[0].toUpperCase() + text.substring(1))
            return e.target.value = capArr.join('');     
        } else if ((e.target.name === 'lastname') && (e.target.value)) {
            inpt = e.target.value;
            inptArr = inpt.toLowerCase().split();
            capArr = inptArr.map(text => text[0].toUpperCase() + text.substring(1))
            return e.target.value =  capArr.join('');     
        }
    }
    componentDidMount() {
        window.scrollTo(0,0);
    }
    componentDidUpdate() {
        // window.scrollTo(0,0);
    }
     
    render() {
        return(
            <PageTemplate>
            <div className="signup-form-container">             
                {
                    (this.state.errMessage ) && (
                    <div className="signup-err-cont" >
                        <p className="signup-err1">{this.state.errMessage}</p>
                    </div>
                    )
                }
                <div className = "signup-form-panel">
                    <div className="signup-form-panel-head">
                        <h2>Sign up</h2>
                    </div>
                    <div className="signup-form-panel-body">   
                        <form onSubmit={this.handleSubmit} method="POST" autoComplete="off" >
                            <div className="form-row  column">  
                            <div className="signup-form-group-container mobile">
                                    {
                                        (this.state.firstNameError.length > 0 && this.state.firstNameError.length < 2) ? 
                                        (   
                                            <div className="err-mssg">
                                            <span  className="signup-err" >{this.state.firstNameError[0].msg}</span>
                                            </div>
                                        ) : 
                                        (this.state.firstNameError.length > 1) ? 
                                        this.state.firstNameError.map((err, i) =>
                                            <span key={i}  className="signup-err">{err.msg}</span>
                                        ) : ''
                                    }
                                    <div className="signup-form-group">
                                        <label>
                                        <input type="text" onBlur={ this.toggleBlur }  onInput ={this.capitalize}  name="firstname" onChange={this.handleInputChange} />
                                        <span className="placeholder">Firstname</span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="signup-form-group-container mobile">
                                    {
                                        (this.state.lastNameError.length > 0 && this.state.lastNameError.length < 2) ? 
                                        (   
                                            <div className="err-mssg">
                                            <span  className="signup-err" >{this.state.lastNameError[0].msg}</span>
                                            </div>
                                        ) : 
                                        (this.state.lastNameError.length > 1) ?
                                        this.state.lastNameError.map((err, i) =>
                                            <span key={i}  className="signup-err">{err.msg}</span>
                                        ) : ''
                                    }
                                    <div className="signup-form-group">                                       
                                        <label>
                                        <input type="text" onBlur={ this.toggleBlur }  onInput ={this.capitalize}  className="form-control" name="lastname" onChange={this.handleInputChange}  />
                                        <span className="placeholder">Lastname</span>
                                        </label>
                                    </div>
                                </div>

                            </div>
                            <div className="form-row column">
                                <div className="signup-form-group-container mobile">
                                    {
                                        (this.state.emailError.length > 0 && this.state.emailError.length < 2) ? 
                                        (   <div className="err-mssg">
                                            <span  className="signup-err" >{this.state.emailError[0].msg}</span>
                                            </div>
                                        ) :
                                        (this.state.emailError.length > 1) ? 
                                            this.state.emailError.map((err, i) =>
                                            <div className="err-mssg" key={i}>
                                                <span  className="signup-err">{err.msg}</span>
                                            </div>
                                        ) : ''
                                    }
                                    <div className="signup-form-group">                                       
                                        <label>
                                        <input type="text" onBlur={ this.toggleBlur } className="form-control" name="email" onChange={this.handleInputChange}  />
                                        <span className="placeholder">Email Address</span>
                                        </label>
                                    </div>
                                </div>
                                    
                                    <div className="signup-form-group-container  mobile">
                                    {
                                        (this.state.phonenumberError.length > 0 && this.state.phonenumberError.length < 2) ? 
                                        (   
                                            <div className="err-mssg">
                                            <span  className="signup-err" >{this.state.phonenumberError[0].msg}</span>
                                            </div>
                                        ) :
                                        ( this.state.phonenumberError.length > 1) ? 
                                            this.state.phonenumberError.map((err, i) =>
                                            <span key={i}  className="signup-err">{err.msg}</span>
                                        )  : ''
                                    }
                                    <div className="signup-form-group">                                       
                                        <label>
                                        <input type="text" onBlur={ this.toggleBlur } className="form-control" name="phonenumber" onChange={this.handleInputChange}  />
                                        <span className="placeholder">Phone Number</span>
                                        </label>
                                    </div>
                                    </div>

                            </div >




                            <div  className="form-password">
                            {
                                (this.state.passwordError.length > 0 && this.state.passwordError.length < 2) ? 
                                (   
                                    <div className="err-mssg" >
                                    <span  className="signup-err">{this.state.passwordError[0].msg}</span>
                                    </div> 
                                ) :
                                (this.state.passwordError.length > 1) ? 
                                this.state.passwordError.map((err, i) =>
                                    <div className="err-mssg" key={i}>
                                        <span  className="signup-err">{err.msg}</span>
                                    </div>
                                ) : ''
                            }
                            <div className="form-row">
                                <div className="signup-form-group-container">
                               
                                    <div className="signup-form-group">
                                        <label>
                                        <input type="password" onBlur={ this.toggleBlur } className="form-control" name="password" onChange={this.handleInputChange}/>
                                        <span className="placeholder">Password</span>
                                        </label>
                                    </div>
                                </div>
                                {/* new div */}
                                <div className="signup-form-group-container">
                                    <div className="signup-form-group">
                                        <label>                  
                                        <input type="password" onBlur={ this.toggleBlur } className="form-control" name="password2" onChange={this.handleInputChange} />
                                        <span className="placeholder">Repeat Password</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            </div>
                           
                            <Button 
                            action={this.state.signingUp} 
                            actionText='Signing Up...' 
                            divClassName='signup-bttn' 
                            buttonClassName='btn' 
                            buttonText='Sign Up' 
                            />
                        </form>
                    </div>
                </div>
            </div>
            </PageTemplate>          
        )
    }
}

// TODO... use the function signup component so as to be able to plug in the backbutton hook component
// function SignupComp(props) {
//     const [valErrors, setValErrors] =useState([]);
//     const [ firstname,setFirstName] = useState('');
//     const [lastname,setLastName] = useState('');
//     const [ email, setEmail] = useState('');
//     const [phonenumber,setPhonenumber] = useState(null);
//     const [password, setPassword] = useState(null);
//     const [password2, setPassword2] = useState(null);
//     const [errMessage, setErrMessage] = useState('');
//     let _firstnameValue = React.createRef();
//     let _lastnameValue = React.createRef();
//     let _emailValue = React.createRef();
//     let _phonenumberValue = React.createRef();
//     let _passwordValue = React.createRef();
//     let _password2Value = React.createRef();

   
//     const signUpFormData = ApplicationData.getSignupFormData();
//           const  handleInputChange = (e) => {
//             const refs = [
//                 _firstnameValue,
//                  _lastnameValue,
//                  _emailValue,
//                  _phonenumberValue,
//                  _passwordValue,
//                  _password2Value
//              ];
//              const inputsNames = {
//                 firstname:function set_first_name(arg){return setFirstName(arg)},
//                 lastname:function set_last_name(arg){return setLastName(arg)},
//                 email:function set_email(arg){return setEmail(arg)},
//                 phonenumber:function set_phonenumber(arg){return setPhonenumber(arg)},
//                 password:function set_password(arg){return setPassword(arg)},
//                 password2:function set_password2(arg){return setPassword2(arg)},
//              }
//              for (let i = 0; i < refs.length; i++) {
//                  for(let key in inputsNames) {
//                     if(refs[i].current.name.toString() === key.toString()) {
//                        inputsNames[key](refs[i].current.value);
//                        return;
//                     }
//                  }
//             }
//         }
        
//             const toggleBlur = (e) => {
//                 const refs = [
//                    _firstnameValue,
//                     _lastnameValue,
//                     _emailValue,
//                     _phonenumberValue,
//                     _passwordValue,
//                     _password2Value
//                 ];
              
//                for (let i = 0; i< refs.length; i++){
//                    if(refs[i].current.value > 0){
//                        return refs[i].current.classList.add('not-empty');
//                    }
//                    return refs[i].current.classList.remove('not-empty'); 

//                }
//                 if(e.target.value.length > 0 ) {
//                     return e.target.classList.add('not-empty');
//                 }
//                 return e.target.classList.remove('not-empty');            
//             }
        
//            const handleSubmit = (e) => {
//                 window.scrollTo(0,0);
//                 e.preventDefault();
//                 const signUpdetails = {
//                     firstname,
//                     lastname,
//                     email,
//                     phonenumber,
//                     password,
//                     password2,

//                 }
//                 signup(signUpdetails)
//                 .then(response =>  response.data)
//                 .then(signupData => {
//                     if(signupData.status !== 200) {
//                         if(signupData.message) {
//                             setErrMessage(signupData.message);
//                             setValErrors([]);
//                             return
//                         }
//                         setValErrors(signupDat.valErrors)
//                         setErrMessage('');
//                         return;
//                     }

//                     localStorage.setItem('x-access-token', signupData.token);
//                     localStorage.setItem('x-access-token-expiration',  Date.now() + 2 * 60 * 60 * 1000);
//                     return signupData;
//                 })
//                 .then(token => {
//                     if(token) {
//                         return window.location = '/'
//                     }
//                 }) 
//                 .catch(err => {
//                     console.error(err)
//                 });
//             }
//             const capitalize = (e) => {
//                 let inpt, inptArr, capArr;
//                 if((e.target.name === 'firstname') && (e.target.value)) {
//                     inpt = e.target.value;
//                     inptArr = inpt.toLowerCase().split();
//                     capArr = inptArr.map(text => text[0].toUpperCase() + text.substring(1))
//                     return e.target.value = capArr.join('');     
//                 } else if((e.target.name === 'lastname') && (e.target.value)) {
//                     inpt = e.target.value;
//                     inptArr = inpt.toLowerCase().split();
//                     capArr = inptArr.map(text => text[0].toUpperCase() + text.substring(1))
//                     return e.target.value =  capArr.join('');     
//                 }
//             }
//             useEffect(()=>{

//             },[]);
//     return(
//         <PageTemplate>
//         <div className="signup-form-container">
//             {
//                 (valErrors.length > 0) && ( 
//                     valErrors.map((err,i)=>
//                     <div key={i} className="signup-err-cont" > 
//                         <p className="signup-err"> {err.msg} </p>
//                     </div>
//                 ))
//             }
//             {
//                 (errMessage ) && (
//                 <div className="signup-err-cont" >
//                     <p className="signup-err">{errMessage}</p>
//                 </div>
//                 )
//             }
//             <div className = "signup-form-panel">
//                 <div className="signup-form-panel-head">
//                     <h2>Sign up</h2>
//                 </div>
//                 <div className="signup-form-panel-body">
//                     <form onSubmit={handleSubmit} method="POST" autoComplete="off" >
//                         {
//                             signUpFormData.map((data, i) =>
//                                 < FormRow  key={i} 
//                                 {...data}
//                                 toggleBlur={toggleBlur}
//                                 handleInputChange={handleInputChange}
//                                 onInput={capitalize} 
//                                 />
//                             )
//                         }
//                         <Button divClassName='signup-bttn' buttonClassName='btn' buttonText='Submit' />
//                     </form>
//                 </div>
//             </div>
//         </div>
//         </PageTemplate>     
//     )
// }