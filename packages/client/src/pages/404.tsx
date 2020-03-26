import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import PaperContainer from '../components/containers/PaperContainer';
import { Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <Layout>
    <SEO title='404: Not found' />
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <PaperContainer>
        <Title>Page Not Found</Title>
        <Text>Sorry, we were unable to find that page.</Text>
        <div style={{ height: 20 }} />
        <Link to='/'>
          <Button
            type='primary'
            size='large'
            shape='round'
            icon={<HomeOutlined />}
          >
            Return Home
          </Button>
        </Link>
      </PaperContainer>
    </div>
  </Layout>
);

export default NotFoundPage;
