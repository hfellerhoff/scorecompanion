import React from 'react';
import { WorkResultProps } from './WorkResult';
import './SearchAlert.scss';
import { Alert } from 'antd';
import { ApolloError } from '@apollo/client';

interface Props {
  works?: WorkResultProps[];
  error?: ApolloError | undefined;
}

const SearchAlert = ({ works, error }: Props) => {
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

  if (works) {
    const numberOfWorks = works.length;
    let numberOfScores = 0;
    works.forEach(work => {
      numberOfScores += work.scores.length;
    });

    return (
      <Alert
        type='success'
        message='Good news!'
        description={`We found ${numberOfWorks} works and ${numberOfScores} scores matching those query parameters.`}
        className='search-overview__alert'
        showIcon
      />
    );
  }

  return <></>;
};

export default SearchAlert;
