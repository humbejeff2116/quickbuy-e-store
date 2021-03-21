import React,{useState} from 'react';
import logo from '../../images/logo.png';
import { isAuthenticated, searchProduct } from '../../services/ecormerce.service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchResult from './SearchComponent/searchResults';
import {  NavLink } from 'react-router-dom';




export function NavSearchBar(props) {
    const [searchedProd,setSearchedProd] = useState([]);
    const [errMssg, setErrMssg] = useState('');
    const [mssg,setMssg] = useState('');
    const auth = isAuthenticated();
    let _searchValue = React.createRef();
    const search = <FontAwesomeIcon icon={['fas', "search"]}  />
    const user = <FontAwesomeIcon  icon={['fas', "user"]}  />

    const searchProducts = (e) => { 
        e.preventDefault();
        const searchedProduct = {
            searchValue: _searchValue.current.value
        }
        if(!searchedproduct.searchValue){
            setMssg('');
            setSearchedProd([]);
            setErrMssg('');
            return;
        }
        searchProduct(searchedProduct)
        .then(response => response.data )
        .then(searchedProducts => {  
            if(searchedProducts.status !== 200) {
                setErrMssg(searchedProducts.errMessage)
                setMssg('');
                setSearchedProd([]); 
                console.log(errMssg);
                return; 
            }
            setMssg(searchedProducts.message);
            setSearchedProd(searchedProducts.data);
            setErrMssg(''); 
            return searchedProducts;
        })
        .catch(err => {
            console.error('error :'+ err)
        });
    }

    const toggleBlur = (e) => {
        if(e.target.value.length > 0) {
            return e.target.classList.add('not-empty');
        }
        return e.target.classList.remove('not-empty')            
      }

    const logOut = ( ) => {
        localStorage.removeItem('x-access-token');
        localStorage.removeItem('user');
      }

    return(
        <div className="search">
            <div className="logo">
            <a href="index.html"><img width="90px" height="40px;" src={logo} alt="logo" title="quickbuy logo" /></a>
            </div>
            <div className="search-bar">
                <form onSubmit = {searchProducts} className="search-bar-form" method="GET" action="/search-product" >
                    <input type="search" name="search" ref={_searchValue} onKeyUp = {searchProducts}  placeholder="Search for clothing brands and collections" onBlur={toggleBlur} /><span><i></i></span>
                    <button type="submit" ><i className="fa fa-search fa-lg">{search}</i></button>
                </form>
            </div>
            <div className="header-login">
                <AuthNav auth={auth} logOut={logOut} user={user} />              
            </div>
                {
                    (searchedProd.length > 0 ) && searchedProd.map((prod ,i)=>
                    <SearchResult key={i} {...prod} />
                    ) 
                }
        </div>
    )
}


function AuthLinks(props) {
    return(
        <div className="login" >
            <NavLink 
            exact 
            className="nav-item nav-link" 
            to={props.href} 
            activeClassName="nav-link-active"
            >
            {props.name}
            </NavLink>
        </div>
    )
}

function AuthNav(props) {
    const authNavLinks = [
        {href:'/checkout',name:'Checkout'},
        {href:'/users/dashboard',name:'Dashboard'}
    ]

    if(props.auth) {
        return(
            <>
            {
                authNavLinks.map((links, i)=>
                <AuthLinks key={i} {...links} />
                )
            }
            <div className="login" >
                <a className="nav-item nav-link" href="/" onClick={props.logOut}>Logout</a>
            </div>
            </>
        )
    }
    return(
        <div className="login" >              
            <NavLink 
            exact 
            className="nav-item nav-link float-right" 
            to="/login"
            activeClassName="nav-link-active"
            >  
                <i className="fa fa-user">{props.user}</i>
                Signup/Login
            </NavLink>            
        </div>
    )
}