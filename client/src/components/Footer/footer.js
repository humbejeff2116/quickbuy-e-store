



import React from 'react';


export const FooterFormComp =(props)=>
//  Footer form 
    <section className="footer-main-content">
        <div>
        <h3 className="ft-title"> quick buy</h3>
        <ul>
              <li><a href="/">Services</a></li>
              <li><a href="/">Portfolio</a></li>
              <li><a href="/">Pricing</a></li>
              <li><a href="/">Customers</a></li>
              <li><a href="/">Careers</a></li>
        </ul>
        </div>
            <div>
               <h3 className="ft-title"> About </h3>
            <ul>
                <li><a href="/">Services</a></li>
                <li><a href="/">Portfolio</a></li>
                <li><a href="/">Pricing</a></li>
                <li><a href="/">Customers</a></li>
                <li><a href="/">Careers</a></li>
            </ul>
            </div>
                <div className="footer-form" >
                        <p>Subscribe to our newsletter to get  latest deals</p>
                            <form>
                                <input type="email" name="email" placeholder="Enter email address" />
                                {/* yet to assign subscribe handler on the onclick event */}
                                <input type="submit" value="Subscribe" onClick={props.suscribe} />
                            </form>
                </div>
    </section>




// seperated the links component on main footer to render it using formfooterdata


export const FooterMainComp =( )=>
//   Footer main
<section className="footer-main">
              <div className="footer-main-item">
                <h3 className="ft-title"> About quick buy</h3>
                <ul>
                  <li><a href="/ggg">Services</a></li>
                  <li><a href="/hh">Portfolio</a></li>
                  <li><a href="/hh">Pricing</a></li>
                  <li><a href="/yy">Customers</a></li>
                  <li><a href="/rr">Careers</a></li>
                </ul>
              </div>
              <div className="ft-main-item">
                <h3 className="ft-title">Resources</h3>
                <ul>
                  <li><a href="/uuu">Docs</a></li>
                  <li><a href="/ttt">Blog</a></li>
                  <li><a href="/tyy">eBooks</a></li>
                  <li><a href="/dgd">Webinars</a></li>
                </ul>
              </div>
              <div className="ft-main-item">
                <h3 className="ft-title">Contact</h3>
                <ul>
                  <li><a href="/">Help</a></li>
                  <li><a href="/">Sales</a></li>
                  <li><a href="/">Advertise</a></li>
                </ul>
              </div>
              <div className="ft-main-item">
                    <h3 className="ft-title">Support</h3>
                    <ul>
                            <li><a href="/">Services</a></li>
                            <li><a href="/">Portfolio</a></li>
                            <li><a href="/">Pricing</a></li>
                            <li><a href="/">Customers</a></li>
                            <li><a href="/">Careers</a></li>
                    </ul>
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
