import React, { useState } from 'react';
import './WorkResult.scss';
import Title from 'antd/lib/typography/Title';
import Paragraph from 'antd/lib/typography/Paragraph';
import Text from 'antd/lib/typography/Text';
import {
  RightOutlined,
  ExportOutlined,
  DownOutlined,
  ExpandOutlined,
  CompressOutlined,
} from '@ant-design/icons';
import { v4 } from 'uuid';
import { Button } from 'antd';

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

interface Props extends WorkResultProps {
  className: string;
  isExpanded: boolean;
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
  className,
  isExpanded,
}: Props) => {
  const [isExpandedLocal, setisExpandedLocal] = useState<boolean | undefined>();

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

  const shouldExpand =
    isExpandedLocal !== undefined ? isExpandedLocal : isExpanded;

  return (
    <div className={`work-result__container ${className}`}>
      <div className='work-result__text-container'>
        <Text className='work-result__title'>{title}</Text>
        <Text className='work-result__composer'>{composer}</Text>
        <Text className='work-result__score-count'>{`${scores.length} scores`}</Text>
      </div>
      <a href={workUrl} target='_blank' rel='noopener noreferrer'>
        <div className='work-result__site'>
          <ExportOutlined className='work-result__site__icon-external' />
          {site.toUpperCase()}
        </div>
      </a>
      <div className='work-result__scores'>
        <div className='work-result__expand'>
          <Button
            type='link'
            className='work-result__expand__button'
            icon={shouldExpand ? <CompressOutlined /> : <ExpandOutlined />}
            onClick={() => {
              if (isExpandedLocal === undefined)
                setisExpandedLocal(!isExpanded);
              else setisExpandedLocal(!isExpandedLocal);
            }}
          >
            {shouldExpand ? 'Compress Result' : `Expand Result`}
          </Button>
        </div>

        {shouldExpand ? (
          sortedScores.map(score => {
            if (numberOfScores - 1 !== currentScore) {
              currentScore += 1;
              return (
                <div key={v4()}>
                  <Score {...score} />
                  <div className='work-result__score__divider' />
                </div>
              );
            } else {
              return <Score key={v4()} {...score} />;
            }
          })
        ) : (
          <></>
        )}
      </div>
      <div className='work-result__badges'></div>
    </div>
  );
};

export default WorkResult;
