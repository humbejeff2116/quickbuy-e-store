
import React from 'react';
import {FooterFormComp} from './footer';
import FooterMainComp from './footerMainComp';
import FooterLegalComp from './footerLegalComp'
import './footer.css';


 export const Footer = (props) =>
    <footer className={props.className ? props.className : ''} >
      <FooterFormComp />
      <FooterMainComp /> 
      <FooterLegalComp />
    </footer>
