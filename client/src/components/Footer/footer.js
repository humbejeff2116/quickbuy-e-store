
import React,{ useState,useEffect } from 'react';
import { postSubscription} from '../../services/ecormerce.service';
import {FooterMainCompChild}  from './footerMainComp';
import ApplicationData from '../../data/appData'


export const FooterFormComp = (props) => {
  const [valErrs,setValErrs] = useState([]);
  const [errMssg, setErrMssg] = useState('');
  const [mssg,setMssg] = useState('');
  let _subEmail = React.createRef();
  const footerContentLinks = ApplicationData.getFooterContentLinks();

  const subscribe= (e) => {
    e.preventDefault();
    const data = {
        subemail: _subEmail.current.value
    }
    postSubscription(data)
    .then(response =>  response.data )
    .then(subscriptionData => {
        if(subscriptionData.status !== 201) {
          if(subscriptionData.message) {
              setErrMssg(subscriptionData.message) 
              setValErrs([]);
            return;
          }
            
          _subEmail.current.focus();
          setErrMssg('') 
          setValErrs(subscriptionData.valErrors)
          return; 
        }
        setMssg(subscriptionData.message);
        _subEmail.current.value ='';
        _subEmail.current.focus();
        return subscriptionData;
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
  return (
    <section className="footer-main-content">
      {
          footerContentLinks.map( (links, i)=>
          <FooterMainCompChild key={i} {...links}/>
          )
      }
      <div className="footer-form" >
        <p>Subscribe to our newsletter to get  latest deals</p>
        <form action="" method="POST" onSubmit={subscribe}  autoComplete="none">
          {
            (valErrs.length > 0) && (valErrs.map( (err, i)=>
            <div key={i} className="sub-err-cont" ><p className="sub-err-mssg">{err.msg}</p></div>
            ))
          }
            <input type="text" onBlur={toggleBlur} name="subemail" ref={_subEmail}  placeholder="Enter email address" />
            <button type="submit">subscribe</button>    
        </form>   
      </div>
    </section>
  ) 
}