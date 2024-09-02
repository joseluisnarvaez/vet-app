import React from 'react';


const Footer = () => {
  return (
    <footer
          className="footer d-flex flex-column flex-md-row align-items-center justify-content-between px-4 py-3 border-top small"
        >
          <p className="text-muted mb-1 mb-md-0">
            Copyright © 2024 
             jnarvaez.
          </p>
          <p className="text-muted">
            Trabajando para usted...
            <i className="mb-1 text-primary ms-1 icon-sm" data-feather="heart"></i>
          </p>
        </footer>
  );
};

export default Footer;