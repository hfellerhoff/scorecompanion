import React, { useState } from 'react';

import Layout from '../components/layout/Layout';
import Hero from '../components/Hero';
import PageTitles from '../typescript/PageTitles';
import PaperContainer from '../components/containers/PaperContainer';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';

const IndexPage = () => {
  const [className, setClassName] = useState('');

  return (
    <Layout
      title={PageTitles.Home}
      className={className}
      header={<></>}
      footer={<></>}
    >
      <Hero onSearchPress={() => setClassName('hero__fade-to-search')} />
    </Layout>
  );
};

export default IndexPage;
