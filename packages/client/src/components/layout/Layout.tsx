import React from 'react';
import { Layout as AntDesignLayout } from 'antd';
const {
  Header: AntDesignHeader,
  Content: AntDesignContent,
  Footer: AntDesignFooter,
} = AntDesignLayout;
import '../../styles/index.css';
import './Layout.scss';

import SEO from '../SEO';
import Header from './Header';
import Footer from './Footer';
import PageTitles from '../../typescript/PageTitles';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: PageTitles;
  className?: string;
  header?: JSX.Element;
  footer?: JSX.Element;
}

const Layout = (props: Props) => {
  const { children, title, header, footer, className } = props;

  return (
    <>
      <SEO title={title} />
      <AntDesignLayout className={`default-background ${className}`}>
        {header || <Header />}
        <AntDesignContent className='content'>{children}</AntDesignContent>
        {footer || <Footer />}
      </AntDesignLayout>
    </>
  );
};

export default Layout;
