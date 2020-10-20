



















import React,{useEffect} from 'react'

import './advertise.css'
import {PageTemplate} from '../PageTemplate/pageTemplate'
// import {Header} from '../Header/index'




export const AdvertisePage =()=>{
        useEffect(()=>{
            window.scrollTo(0,0)
        },[])
        
        return(
        <PageTemplate>
            {/* <Header /> */}

        <div className="advertise-container">
            <div className="advertise-header">
                <h3>Avertise with us</h3>

            </div>
            <div className="advertise-body">


            </div>
            
        </div>
        </PageTemplate>
        )
}
