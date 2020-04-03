import React, { useEffect } from 'react';
import CountUp, { useCountUp } from 'react-countup';
import { useQuery } from '@apollo/client';
import getCounts from '../../graphql/queries/getCounts';
import Text from 'antd/lib/typography/Text';
import './CountUpDisplay.scss';

const addCommasToNumber = (n: number) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const CountUpDisplay = () => {
  const { data } = useQuery(getCounts);
  const { countUp: siteCount, update: updateSite } = useCountUp({
    end: 0,
    formattingFn: addCommasToNumber,
  });
  const { countUp: workCount, update: updateWork } = useCountUp({
    end: 0,
    formattingFn: addCommasToNumber,
  });
  const { countUp: scoreCount, update: updateScore } = useCountUp({
    end: 0,
    formattingFn: addCommasToNumber,
  });

  useEffect(() => {
    if (data) {
      updateSite(data.siteCount);
      updateWork(data.workCount);
      updateScore(data.scoreCount);
    }
  }, [data]);

  return (
    <>
      <div className='count-up-display'>
        <div className='count-up-display__block count-up-display__block--one'>
          <Text className='count-up-display__number'>{siteCount}</Text>
          <Text className='count-up-display__label'>Site</Text>
        </div>
        <div className='count-up-display__block count-up-display__block--two'>
          <Text className='count-up-display__number'>{workCount}</Text>
          <Text className='count-up-display__label'>Works</Text>
        </div>
        <div className='count-up-display__block count-up-display__block--three'>
          <Text className='count-up-display__number'>{scoreCount}</Text>
          <Text className='count-up-display__label'>Scores</Text>
        </div>
      </div>
    </>
  );
};

export default CountUpDisplay;
