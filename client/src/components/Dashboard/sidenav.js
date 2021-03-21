
import React, {useEffect,useState}  from 'react';
import logo from '../../images/logo.png';
import Avatar from './sidenavAvatar';
import Link from '../Link/link';
import ApplicationData from '../../data/appData';
import './sidenav.css';



export default function SideNav(props){
    const sideNavLinks = ApplicationData.getSideNavLinks()
    const [loading, setLoading] = useState(false);
    const [user, setUser] =  useState([]);

    useEffect(()=>{
        // const user = localStorage.getItem('user');
        // getUser(user)
        // .then()
    })
    return (
        <section className="side-nav">
        <Avatar logo={logo} user={user} className='profile-image' />
        <nav>
            {
                sideNavLinks.map((link, i)=>
                <Link 
                className='side-nav-item' 
                activeClassName='side-nav-active'
                spanClassName='side-nav-text'
                key={i} 
                {...link}  
                />
                )
            }        
        </nav>
        </section>
    )
}