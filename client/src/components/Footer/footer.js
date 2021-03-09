





import React,{ useState,useEffect } from 'react';
import { postSubscription} from '../../services/ecormerce.service';


export const FooterFormComp =(props)=>{
    let _subEmail = React.createRef();
    const [valErrs,setValErrs] = useState([]);
    const [errMssg, setErrMssg] = useState('');
    const [mssg,setMssg] = useState('');

    const toggleBlur =(e)=> {

        if(e.target.value.length > 0 ) {
  
         return e.target.classList.add('not-empty');
       
        }
  
         return e.target.classList.remove('not-empty')
                  
      }
 
// email subscription function
 const subscribe= (e) => {
        // window.scrollTo(0,0)

        e.preventDefault();
        const data = {
            subemail: _subEmail.current.value
        }

        postSubscription(data)
        .then(response=>{

      
        return response.data;

        })
        .then(subscriptionData => {


        if(subscriptionData.status !== 201){
        if(subscriptionData.message){
            setErrMssg(subscriptionData.message) 
            console.log(errMssg);
           setValErrs([]);
           return;

        }

        console.log(subscriptionData.valErrors);
       
        _subEmail.current.focus();
       
        setErrMssg('') 
        setValErrs(subscriptionData.valErrors)
        console.log(valErrs)
        
       
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
   
    return(
          //  Footer form 
    <section className="footer-main-content">
    <div>
    <h3 className="ft-title"> quick buy</h3>
   
          <li><a href="/">Services</a></li>
          <li><a href="/">Portfolio</a></li>
          <li><a href="/">Pricing</a></li>
          <li><a href="/">Customers</a></li>
          <li><a href="/">Careers</a></li>
   
    </div>
        <div>
           <h3 className="ft-title"> About </h3>
       
            <li><a href="/">Services</a></li>
            <li><a href="/">Portfolio</a></li>
            <li><a href="/">Pricing</a></li>
            <li><a href="/">Customers</a></li>
            <li><a href="/">Careers</a></li>
      
        </div>
            <div className="footer-form" >
                    <p>Subscribe to our newsletter to get  latest deals</p>
                        <form action="" method="POST" onSubmit={subscribe}  autoComplete="none">
                        {
                        (valErrs.length > 0) && (valErrs.map((err,i)=>
                        <div key={i} className="sub-err-cont" ><p className="sub-err-mssg">{err.msg}</p></div>
                        ))
           }
                        
                            <input type="text" name="subemail" ref={_subEmail} onBlur={toggleBlur}  placeholder="Enter email address" />
                         
                            {/* yet to assign subscribe handler on the onclick event */}

                            <button type="submit">subscribe</button>
                         
                        </form>
             
            </div>
</section>


    )
  

}




// seperated the links component on main footer to render it using formfooterdata


export const FooterMainComp =( )=>
//   Footer main
<section className="footer-main">
              <div className="footer-main-item">
                <h3 className="ft-title"> About quick buy</h3>
               
                  <li><a href="/ggg">Services</a></li>
                  <li><a href="/hh">Portfolio</a></li>
                  <li><a href="/hh">Pricing</a></li>
                  <li><a href="/yy">Customers</a></li>
                  <li><a href="/rr">Careers</a></li>
              
              </div>
              <div className="ft-main-item">
                <h3 className="ft-title">Resources</h3>
               
                  <li><a href="/uuu">Docs</a></li>
                  <li><a href="/ttt">Blog</a></li>
                  <li><a href="/tyy">eBooks</a></li>
                  <li><a href="/dgd">Webinars</a></li>
               
              </div>
              <div className="ft-main-item">
                <h3 className="ft-title">Contact</h3>
               
                  <li><a href="/">Help</a></li>
                  <li><a href="/">Sales</a></li>
                  <li><a href="/">Advertise</a></li>
               
              </div>
              <div className="ft-main-item">
                    <h3 className="ft-title">Support</h3>
                   
                            <li><a href="/">Services</a></li>
                            <li><a href="/">Portfolio</a></li>
                            <li><a href="/">Pricing</a></li>
                            <li><a href="/">Customers</a></li>
                            <li><a href="/">Careers</a></li>
                   
                  </div>
             
            </section>

   

export const FooterLegalComp =()=>
        // Footer legal 
    <section className="footer-legal">
        <ul className="footer-legal-list">
            <li><a href="/term">Terms &amp; Conditions</a></li>
            <li><a href="/term">Privacy Policy</a></li>
            <li><a href="/term">Developed by Humbe Jeffrey</a></li>
            <li><a href='/#'>&copy; 2019 Copyright Huje Soft Inc.</a></li>
        </ul>
    </section>
