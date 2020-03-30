import React from 'react';
import '../styles/index.css';

import GatsbyLayout from '../components/layout';
import SEO from '../components/seo';
import Hero from '../components/Hero';
import { Layout } from 'antd';
const { Footer: AntFooter, Content } = Layout;

const IndexPage = () => (
  <GatsbyLayout>
    <SEO title='Home' />
    <Layout className='default-background'>
      <Content>
        <Hero />
      </Content>
    </Layout>
  </GatsbyLayout>
);

export default IndexPage;
