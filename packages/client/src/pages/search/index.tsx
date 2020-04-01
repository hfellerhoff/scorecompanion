import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import SearchParameterInput, {
  FormVariables,
} from '../../components/forms/SearchParameterInput';
import Logo from '../../components/icons/Logo';
import { navigate } from 'gatsby';
import { Layout as AntDesignLayout } from 'antd';
const { Header } = AntDesignLayout;

import './Search.scss';
import SearchManager from '../../components/search/SearchManager';
import PageTitles from '../../typescript/PageTitles';

const Search = () => {
  const [layoutClassName, setLayoutClassName] = useState('');

  const [title, setTitle] = useState('');
  const [composer, setComposer] = useState('');

  const [isTyping, setIsTyping] = useState(false);

  const onValuesChange = (values: FormVariables) => {
    setTitle(values.title || '');
    setComposer(values.composer || '');
  };

  return (
    <Layout
      title={PageTitles.Search}
      className={`search ${layoutClassName}`}
      header={
        <Header className='search__header'>
          <div className='search__search-container'>
            <div
              className='search__logo-click-handler'
              onClick={() => {
                setLayoutClassName('search__fade-to-home');
                setTimeout(() => {
                  navigate('/');
                }, 250);
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
      }
      footer={<></>}
    >
      <div className='search__content'>
        <SearchManager variables={{ title, composer }} isTyping={isTyping} />
      </div>
    </Layout>
  );
};

export default Search;
