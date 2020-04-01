import React, { useEffect, useState } from 'react';
import { Layout as AntDesignLayout, Button } from 'antd';
const { Header: AntDesignHeader } = AntDesignLayout;
import './Header.scss';
import { SearchOutlined, DollarOutlined } from '@ant-design/icons';
import { navigate } from 'gatsby';
import Logo from '../icons/Logo';

interface Props {}

// const classNameShow = 'header header--visible';
// const classNameHide = 'header header--hidden';

const Header = (props: Props) => {
  // const [scrollY, setScrollY] = useState(0);
  // const [className, setClassName] = useState(classNameShow);

  // useEffect(() => {
  //   const updateScrollY = () => {
  //     if (window.scrollY > 0) {
  //       setScrollY(window.scrollY);
  //     }
  //   };

  //   if (scrollY > 0) {
  //     if (scrollY < window.scrollY) setClassName(classNameHide);
  //     else if (scrollY > window.scrollY) setClassName(classNameShow);
  //   }

  //   window.addEventListener('scroll', updateScrollY);
  //   return () => {
  //     window.removeEventListener('scroll', updateScrollY);
  //   };
  // }, [scrollY]);

  return (
    <AntDesignHeader className='header'>
      <div className='header__content'>
        <div>
          <Logo title size={100} />
        </div>
        <div>
          <Button
            type='primary'
            size='middle'
            shape='round'
            icon={<DollarOutlined />}
            // style={{ background: '#13c2c2' }}
          >
            Support
          </Button>
          {/* <Button
            type='primary'
            size='middle'
            shape='round'
            icon={<SearchOutlined />}
            onClick={() => {
              // if (heroRef)
              //   heroRef.className = 'hero__background hero__fade-to-search';
              setTimeout(() => {
                navigate('/search');
              }, 0);
            }}
          >
            Search
          </Button> */}
        </div>
      </div>
    </AntDesignHeader>
  );
};

export default Header;
