import React, { useState, useEffect } from 'react';
import GatsbyLayout from '../../components/layout';
import SEO from '../../components/seo';
import { Layout } from 'antd';
import SearchParameterInput, {
  FormVariables,
} from '../../components/forms/SearchParameterInput';
import Logo from '../../components/icons/Logo';
const { Header, Content } = Layout;
import { navigate } from 'gatsby';

import './Search.scss';
import SearchManager from '../../components/search/SearchManager';

const Search = () => {
  const [layoutClassName, setLayoutClassName] = useState('');

  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');

  const [isTyping, setIsTyping] = useState(false);

  const onValuesChange = (values: FormVariables) => {
    setTitle(values.title || '');
    setComposer(values.composer || '');
  };

  console.log(isTyping);

  return (
    <GatsbyLayout>
      <SEO title='Search' />
      <Layout className={layoutClassName}>
        <Header className='search__header'>
          <div className='search__search-container'>
            <div
              className='search__logo-click-handler'
              onClick={() => {
                setLayoutClassName('search__fade-to-home');
                setTimeout(() => {
                  navigate('/');
                }, 225);
              }}
            >
              <Logo size={150} title />
            </div>
            <SearchParameterInput
              fetchWithValues={onValuesChange}
              setIsTyping={setIsTyping}
            />
          </div>
        </Header>
        <Content className='search__content'>
          <div>
            <SearchManager
              variables={{ title, composer }}
              isTyping={isTyping}
            />
          </div>
        </Content>
      </Layout>
    </GatsbyLayout>
  );
};

export default Search;
