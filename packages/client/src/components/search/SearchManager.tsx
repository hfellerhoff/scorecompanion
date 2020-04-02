import React, { useEffect, useState } from 'react';
import WorkResultRoll from './WorkResultRoll';
import getWorksByTitleAndComposer from '../../graphql/queries/getWorksByTitleAndComposer';
import SearchStateDisplay from './SearchStateDisplay';
import SearchAlert from './SearchAlert';
import { useQuery } from '@apollo/client';
import './SearchManager.scss';
import { WorkResultProps } from './WorkResult';

interface SearchManagerProps {
  variables: {
    title: string;
    composer: string;
  };
  isTyping: boolean;
  isExpanded: boolean;
}

interface WorksByTitleAndComposerResult {
  worksByTitleAndComposer: WorkResultProps[];
  worksByTitleAndComposerCount: number;
}

// type SearchState = 'idle' | 'no-input' | 'loading' | 'error' | 'success';

const SearchManager = ({
  variables,
  isTyping,
  isExpanded,
}: SearchManagerProps) => {
  let fetch = false;
  const values = Object.values(variables);
  for (const value in values) {
    if (values[value] !== '') {
      fetch = true;
    }
  }

  if (isTyping) return <SearchStateDisplay state='loading' />;
  if (!fetch) return <SearchStateDisplay state='no-input' />;

  const take = 10;
  const [moreResults, setMoreResults] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const { loading, error, data, refetch, fetchMore } = useQuery(
    getWorksByTitleAndComposer,
    {
      variables: { ...variables, take, skip: 0 },
      fetchPolicy: 'cache-and-network',
    }
  );

  const updateAndFetchMore = async () => {
    setShouldAnimate(false);
    setTimeout(async () => {
      await fetchMore({
        variables: { skip: data.worksByTitleAndComposer.length },
        updateQuery: (
          prev: WorksByTitleAndComposerResult,
          { fetchMoreResult }
        ) => {
          if (!fetchMoreResult) return prev;
          return {
            worksByTitleAndComposer: [
              ...prev.worksByTitleAndComposer,
              ...fetchMoreResult.worksByTitleAndComposer,
            ],
          };
        },
      });
      setShouldAnimate(true);
    }, 0);
  };

  useEffect(() => {
    refetch({ ...variables, take, skip: 0 });
  }, [variables.composer, variables.title]);

  useEffect(() => {
    // if (data) setShouldAnimate(false);
  }, [isExpanded]);

  if (loading && !data) return <SearchStateDisplay state='loading' />;

  if (error) return <SearchAlert error={error} />;

  if (
    data.worksByTitleAndComposerCount <= data.worksByTitleAndComposer.length &&
    moreResults
  )
    setMoreResults(false);

  if (data.worksByTitleAndComposer.length > 0) {
    return (
      <>
        <SearchAlert workCount={data.worksByTitleAndComposerCount} />
        <WorkResultRoll
          works={data.worksByTitleAndComposer || []}
          loadMore={updateAndFetchMore}
          hasMore={moreResults}
          take={take}
          shouldAnimate={shouldAnimate}
          isExpanded={isExpanded}
        />
      </>
    );
  }

  return <SearchStateDisplay state='no-results' />;
};

export default SearchManager;
