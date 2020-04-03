import React, { useEffect } from 'react';
import { useCountUp } from 'react-countup';
import { useQuery } from '@apollo/client';
import getCounts from '../../graphql/queries/getCounts';
import Text from 'antd/lib/typography/Text';
import './CountUpDisplay.scss';

const addCommasToNumber = (n: number) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CountUpDisplay = () => {
  const { data } = useQuery(getCounts);
  const {
    countUp: siteCount,
    update: updateSite,
    reset: resetSite,
  } = useCountUp({
    end: 0,
    formattingFn: addCommasToNumber,
    duration: 5,
  });
  const {
    countUp: workCount,
    update: updateWork,
    reset: resetWork,
  } = useCountUp({
    end: 0,
    formattingFn: addCommasToNumber,
    duration: 5,
  });
  const {
    countUp: scoreCount,
    update: updateScore,
    reset: resetScore,
  } = useCountUp({
    end: 0,
    formattingFn: addCommasToNumber,
    duration: 5,
  });

  useEffect(() => {
    if (data) {
      resetSite();
      resetWork();
      resetScore();

      updateSite(data.siteCount);
      updateWork(data.workCount);
      updateScore(data.scoreCount);
    }
  }, [data]);

  return (
    <>
      <div className='count-up-display'>
        <div className='count-up-display__block-container count-up-display__block-container--top'>
          <div className='count-up-display__block count-up-display__block--one'>
            <Text className='count-up-display__number'>{siteCount}</Text>
            <Text className='count-up-display__label'>Site</Text>
          </div>
          <div className='count-up-display__block count-up-display__block--two'>
            <Text className='count-up-display__number'>{workCount}</Text>
            <Text className='count-up-display__label'>Works</Text>
          </div>
        </div>
        <div className='count-up-display__block-container count-up-display__block-container--bottom'>
          <div className='count-up-display__block count-up-display__block--three'>
            <Text className='count-up-display__number'>{scoreCount}</Text>
            <Text className='count-up-display__label'>Scores</Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountUpDisplay;
