import React, { ReactElement } from 'react';

// const style = {
//   borderTop: '1px solid #E7E7E7',
//   textAlign: 'center',
//   padding: '20px',
//   position: 'fixed',
//   left: '0',
//   bottom: '0',
//   height: '60px',
//   width: '100%',
//   background-color: 'black'
// };

const phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
};

const Footer = (): ReactElement => {
  return (
    <div id= 'footer' style={phantom}>
      <footer style={phantom} id="footer">
        <div className='footer-text'>
      Closet Collections
        </div>
        <div className='footer-text'>
      Since 2021
        </div>
      </footer>
    </div>
  );
};

export default Footer;
