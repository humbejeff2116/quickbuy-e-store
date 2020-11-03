











import React, {useEffect,useState}  from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import './sidenav.css';



export default function SideNav(props){

    const [loading, setLoading] = useState(false);
    const [user, setUser] =useState([]);

return (
    <section className="side-nav">
    <nav>
    <> 
        {
            (user.length === 0)?
            <div className="no-profile">
             
               <img src={logo} width="50px" height="50px" alt="profileimg"/>

            </div>:
            user.map((usr,id)=>
                <div className="profile">
                    <img key={id}src={usr.profileImage} alt="profileimg"/>
               </div>
                ) 
        }      
        </>

        <div className="side-nav-item" >
            <Link to='/users/dashboard'> Dashboard </Link>               
        </div>

        <div className="side-nav-item" >
        <Link to='/users/account'>  Account </Link>
        </div>

        <div className="side-nav-item" > 
        <Link to='/users/profile'> Profile </Link> 
        </div>

        <div className="side-nav-item" >
            <Link to='/users/orders'>  Orders</Link> 
        </div>

        <div className="side-nav-item" > 
        <Link to='/users/settings'>  Settings </Link>
        </div>

        <div className="side-nav-item" > 
        <Link to='/users/help'> Help </Link> 
        </div>      
    </nav>

    </section>


)
    


}