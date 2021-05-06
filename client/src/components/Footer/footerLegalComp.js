
import React from 'react';
import FooterLinks from './footerLinks';
import ApplicationData from '../../data/appData';





export default function FooterLegalComp( ) {
  const footerLegalLinks = ApplicationData.getFooterLegalLinks();

    return(
      <section className="footer-legal">
        <div className="footer-legal-list">
          {
            footerLegalLinks.map((links, i)=>
            <FooterLinks key={i} {...links} />
            )
          }  
        </div>
      </section>
    )
}      