import React from 'react';
import Text from 'antd/lib/typography/Text';
import './SearchStateDisplay.scss';
import { SearchOutlined, StopOutlined } from '@ant-design/icons';
import ScaleLoader from 'react-spinners/ScaleLoader';

interface Props {
  state: 'no-input' | 'no-results' | 'loading';
}

const NoResults = ({ state }: Props) => {
  switch (state) {
    case 'no-input':
      return (
        <div className='search-state-display__container'>
          <div className='search-state-display__icon-container'>
            <SearchOutlined className='search-state-display__icon' />
          </div>
          <Text className='search-state-display__text'>
            Enter some search parameters to get started!
          </Text>
        </div>
      );

    case 'no-results':
      return (
        <div className='search-state-display__container'>
          <div className='search-state-display__icon-container'>
            <StopOutlined className='search-state-display__icon' />
          </div>
          <Text className='search-state-display__text'>
            No results found for the specified parameters.
          </Text>
        </div>
      );

    case 'loading':
      return (
        <div className='search-state-display__container'>
          <div className='search-state-display__icon-container'>
            <div className='search-state-display__loading'>
              <ScaleLoader color='white' />
            </div>
          </div>
          <Text className='search-state-display__text'>Loading results...</Text>
        </div>
      );
  }
};

export default NoResults;
