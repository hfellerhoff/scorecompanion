import React from 'react';
import '../styles/index.css';

import GatsbyLayout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/Hero';
import { Layout, Menu, Button } from 'antd';
import LogoFilled from '../components/icons/LogoFilled';
import Logo from '../components/icons/Logo';
import { SearchOutlined } from '@ant-design/icons';
import { volcano, red } from '@ant-design/colors';
const { Header, Content } = Layout;

const IndexPage = () => (
  <GatsbyLayout>
    <SEO title='Home' />
    <Layout>
      {/* <Header
        style={{
          zIndex: 1,
          display: 'flex',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          // top: 0,
          // left: '50%',
          // marginLeft: -385,
          // width: 770,
          background: volcano[3],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Menu
          style={{
            zIndex: 2,
            display: 'flex',
            width: 770,
            background: 'transparent',
            border: 'none',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo title size={120} />
          <Button type='link'>Search</Button>
        </Menu>
      </Header> */}
      <Content>
        <Hero />
      </Content>
    </Layout>
  </GatsbyLayout>
);

export default IndexPage;
