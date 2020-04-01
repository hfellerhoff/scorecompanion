import React from 'react';
import { navigate } from 'gatsby';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface Props {}

const SearchButton = (props: Props) => {
  return (
    <Button
      type='link'
      size='large'
      shape='round'
      icon={<SearchOutlined />}
      onClick={() => {
        // if (heroRef)
        //   heroRef.className = 'hero__background hero__fade-to-search';
        setTimeout(() => {
          navigate('/search');
        }, 0);
      }}
      style={{ color: 'black' }}
    >
      Search
    </Button>
  );
};

export default SearchButton;
