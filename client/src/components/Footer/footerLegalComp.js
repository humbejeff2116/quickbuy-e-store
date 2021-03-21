
import React from 'react';
import FooterLinks from './footerLinks';
import ApplicationData from '../../data/appData';





export default function FooterLegalComp( ) {
  const footerLegalLinks = ApplicationData.getFooterLegalLinks();

    return(
      <section className="footer-legal">
        <ul className="footer-legal-list">
          {
            footerLegalLinks.map((links, i)=>
            <FooterLinks key={i} {...links} />
            )
          }  
        </ul>
      </section>
    )
}      