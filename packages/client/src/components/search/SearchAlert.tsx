import React from 'react';
import { WorkResultProps } from './WorkResult';
import './SearchAlert.scss';
import { Alert } from 'antd';
import { ApolloError } from '@apollo/client';

interface Props {
  workCount?: number;
  error?: ApolloError | undefined;
}

const SearchAlert = ({ workCount, error }: Props) => {
  if (error) {
    return (
      <Alert
        type='error'
        message='Oops! An error occurred.'
        description={error.message}
        className='search-overview__alert'
        showIcon
      />
    );
  }

  if (workCount) {
    return (
      <Alert
        type='success'
        message='Good news!'
        description={`We found ${workCount} works matching those query parameters.`}
        // and roughly ${Math.ceil(workCount * 3)} scores
        className='search-overview__alert'
        showIcon
      />
    );
  }

  return <></>;
};

export default SearchAlert;
