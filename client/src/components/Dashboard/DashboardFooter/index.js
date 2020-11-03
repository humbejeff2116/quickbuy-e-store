

import React from 'react';

import {FooterFormComp, FooterMainComp, FooterLegalComp} from './dashboardFooter';
import './dashboardFooter.css';


 export const Footer =( )=>
    <footer className="dashboard-footer">
      <FooterFormComp />
      <FooterMainComp /> 
      <FooterLegalComp />
    </footer>
