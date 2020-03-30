import React from 'react';
import './WorkResult.scss';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import { RightOutlined, ExportOutlined } from '@ant-design/icons';
import { v4 } from 'uuid';

interface ScoreProps {
  description: string;
  title: string;
  url: string;
}

export interface WorkResultProps {
  id: string;
  title: string;
  composer: string;
  site: string;
  workUrl: string;
  scores: ScoreProps[];
}

const Score = ({ title, description, url }: ScoreProps) => {
  return (
    <a
      className='work-result__score__link'
      href={url}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='work-result__score__container'>
        <div className='work-result__score__details'>
          <Text className='work-result__score__title'>{title}</Text>
          <Text className='work-result__score__description'>{description}</Text>
        </div>
        <RightOutlined />
      </div>
    </a>
  );
};

const WorkResult = ({
  title,
  composer,
  scores,
  site,
  workUrl,
}: WorkResultProps) => {
  const numberOfScores = scores.length;
  let currentScore = 0;

  const sortedScores = scores.slice();
  sortedScores.sort((a, b) => {
    const nameA = a.title.toUpperCase(); // ignore upper and lowercase
    const nameB = b.title.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  return (
    <div className='work-result__container'>
      <div className='work-result__text-container'>
        <Text className='work-result__title'>{title}</Text>
        <Text className='work-result__composer'>{composer}</Text>
      </div>
      <a href={workUrl} target='_blank' rel='noopener noreferrer'>
        <div className='work-result__site'>
          <ExportOutlined className='work-result__site__icon-external' />
          {site.toUpperCase()}
        </div>
      </a>
      <div className='work-result__scores'>
        {sortedScores.map(score => {
          if (numberOfScores - 1 !== currentScore) {
            currentScore += 1;
            return (
              <div key={score.url}>
                <Score {...score} />
                <div className='work-result__score__divider' />
              </div>
            );
          }
          return <Score key={score.url} {...score} />;
        })}
      </div>
      <div className='work-result__badges'></div>
    </div>
  );
};

export default WorkResult;
