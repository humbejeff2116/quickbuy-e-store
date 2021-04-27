
import React from 'react';




export default function Avatar (props) {
    if(props.user && props.user.length > 0) {
        return(
            <>
            {
                props.user.map( (usr, id) =>
                <div className={props.className}key={id} >
                    <img  src={usr.profileImage} alt="profileimage" width="100%" height="100%" />
               </div>
                ) 
            }
            </>
        )
    }
    return(
        <div className={props.className}>
        <img src={props.logo} width="50px" height="50px" alt="profileimage" />
        </div> 
    ) 
}     