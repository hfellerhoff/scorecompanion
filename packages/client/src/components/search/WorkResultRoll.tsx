import React, { useEffect, useState } from 'react';
import WorkResult, { WorkResultProps } from './WorkResult';
import { v4 } from 'uuid';
import { Button, Spin } from 'antd';
import './WorkResultRoll.scss';
import { SearchOutlined } from '@ant-design/icons';
import SearchStateDisplay from './SearchStateDisplay';

export interface WorkResultRollProps {
  works: WorkResultProps[];
  loadMore: () => void;
  hasMore: boolean;
  take: number;
  shouldAnimate: boolean;
  // setShouldAnimate: (value: boolean) => void;
}

const WorkResultRoll = ({
  works,
  hasMore,
  loadMore,
  take,
  shouldAnimate,
}: // setShouldAnimate,
WorkResultRollProps) => {
  // const [shouldAnimate, setShouldAnimate] = useState(true);

  const getWorks = () => {
    const BASE_WORK_LIMIT = 50;
    const workLimit = shouldAnimate ? BASE_WORK_LIMIT : BASE_WORK_LIMIT - 10;
    const worksToDisplay =
      works.length >= BASE_WORK_LIMIT
        ? works.slice(works.length - workLimit, works.length)
        : works;

    // console.log('Returning works', shouldAnimate);
    let index = 0;
    const numberOfWorks = worksToDisplay.length;
    const fadeThreshold = numberOfWorks - take;

    const elements = worksToDisplay.map(work => {
      const classNameToAdd =
        index >= fadeThreshold ? 'work-result--animate' : '';
      const className = shouldAnimate ? classNameToAdd : '';
      index += 1;
      return <WorkResult {...work} className={className} key={v4()} />;
    });

    return elements;
  };

  // useEffect(() => {
  //   setShouldAnimate(true);
  // }, [works]);

  return (
    <>
      {getWorks()}
      {hasMore ? (
        <Button
          className='work-result-roll__loading-button'
          type={shouldAnimate ? 'primary' : 'default'}
          size='large'
          disabled={!shouldAnimate}
          onClick={loadMore}
          icon={
            shouldAnimate ? (
              <SearchOutlined />
            ) : (
              <Spin style={{ marginRight: 10 }} size='small' />
            )
          }
          shape='round'
        >
          {shouldAnimate ? 'Load More' : 'Loading...'}
        </Button>
      ) : (
        <SearchStateDisplay state='finished' />
      )}
    </>
  );
};

export default WorkResultRoll;
