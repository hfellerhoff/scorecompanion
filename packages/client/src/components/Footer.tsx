import React from 'react';
import './Footer.scss';
import Text from 'antd/lib/typography/Text';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__content-container'>
        <a
          href='https://www.henryfellerhoff.com'
          target='_blank noopener noreferrer'
          className='footer__logo-container'
        >
          <img
            alt='Logo'
            src={require('../images/hf-logo.svg')}
            className='footer__logo'
          />
          <Text className='footer__name'>Built by Henry Fellerhoff</Text>
        </a>
      </div>
    </div>
  );
};

export default Footer;
