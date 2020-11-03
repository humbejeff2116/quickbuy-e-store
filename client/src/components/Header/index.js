









import React, {useEffect}  from 'react'
import { MainNavBar, NavGifsBar} from './header';
import './header.css'







 export const Header =( )=>{
     const [scrolled, setScrolled] = React.useState(false);
     const handleScroll =()=>{
         const offset = window.scrollY;
         if(offset>0){
             setScrolled(true)
         } else{
             setScrolled(false)
         }

     }
     useEffect(()=>{
         window.addEventListener('scroll', handleScroll);
         return ()=>{
             window.removeEventListener('scroll',handleScroll);
         }
     });
    let navbarClasses =['header-container'];
    if(scrolled){
        navbarClasses.push('scrolled')
    }
  return(
    <nav className={navbarClasses.join(" ")}>
    <NavGifsBar />
    <MainNavBar/>    
</nav>

  )
   
 }
  
  