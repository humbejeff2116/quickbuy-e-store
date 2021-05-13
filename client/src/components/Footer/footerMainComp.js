
import React from 'react';
import FooterLinks from './footerLinks';
import ApplicationData from '../../data/appData';




export default  function FooterMainComp() {
  const footerMainLinks =  ApplicationData.getFooterMainLinks();
    return(
      <section className="footer-main">
        {
          footerMainLinks.map((links, i) =>
          <FooterMainCompChild key={i} {...links}/>
          )
        }      
      </section>
    )
}

export function FooterMainCompChild(props) {
    return(
       <div className="ft-main-item">
          <h4 className="ft-title">{props.title}</h4>
         <div className="ft-main-links">
            {(props.links) &&
              props.links.map((link, i) =>
              <FooterLinks key={i} {...link}/>
              )
            }
            </div>
         
        </div>
    )
}