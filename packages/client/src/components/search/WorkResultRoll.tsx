import React from 'react';
import WorkResult, { WorkResultProps } from './WorkResult';

export interface WorkResultRollProps {
  works: WorkResultProps[];
}

const MAX_RESULTS = 50;
const WorkResultRoll = ({ works }: WorkResultRollProps) => {
  let results = 0;
  return (
    <div>
      {works.map(work => {
        results += 1;
        return results < MAX_RESULTS ? (
          <WorkResult {...work} key={work.id} />
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default WorkResultRoll;
