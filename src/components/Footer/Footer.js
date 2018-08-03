/**
 * Footer
 */
import React from 'react';

// app config
import AppConfig from '../../constants/AppConfig';

const Footer = () => (
  <div className="rct-footer">
    <div className="d-flex justify-content-center">
      <h5>{AppConfig.copyRightText}</h5>
    </div>
  </div>
);

export default Footer;
