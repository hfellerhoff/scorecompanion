import React, { useEffect, useState } from 'react';
import WorkResultRoll from './WorkResultRoll';
import getWorksByTitleAndComposer from '../../graphql/queries/getWorksByTitleAndComposer';
import SearchStateDisplay from './SearchStateDisplay';
import SearchAlert from './SearchAlert';
import { useQuery } from '@apollo/client';
import './SearchManager.scss';

interface SearchManagerProps {
  variables: {
    title: string;
    composer: string;
  };
  isTyping: boolean;
}

// type SearchState = 'idle' | 'no-input' | 'loading' | 'error' | 'success';

const SearchManager = ({ variables, isTyping }: SearchManagerProps) => {
  let fetch = false;
  const values = Object.values(variables);
  for (const value in values) {
    if (values[value] !== '') {
      fetch = true;
    }
  }

  if (isTyping) return <SearchStateDisplay state='loading' />;
  if (!fetch) return <SearchStateDisplay state='no-input' />;

  const { loading, error, data, refetch } = useQuery(
    getWorksByTitleAndComposer,
    {
      variables: { ...variables },
    }
  );

  useEffect(() => {
    console.log(variables);

    refetch(variables);
  }, [variables]);

  if (loading) return <SearchStateDisplay state='loading' />;

  if (error) return <SearchAlert error={error} />;

  if (data.worksByTitleAndComposer.length > 0)
    return (
      <>
        <SearchAlert works={data.worksByTitleAndComposer} />
        <WorkResultRoll works={data.worksByTitleAndComposer} />
      </>
    );

  return <SearchStateDisplay state='no-results' />;
};

export default SearchManager;
