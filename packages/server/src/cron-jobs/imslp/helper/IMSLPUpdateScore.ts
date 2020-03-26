import { Work } from '../../../entity/Work';
import { IMSLPWork, IMSLPResponse } from '../typescript/IMSLPInterfaces';
import { getRepository, Connection } from 'typeorm';
import { imslpFetchScoresFromWork } from './IMSLPFetchScoresFromWork';
import { Score } from '../../../entity/Score';

export const imslpUpdateScore = async (
  connection: Connection,
  response: IMSLPResponse
) => {
  // Retrieve the necessary information from the work
  const imslpWork: IMSLPWork = {
    title: response.intvals.worktitle,
    composer: response.intvals.composer,
    link: response.permlink,
  };

  // Fetch scores for the given work
  const scores = await imslpFetchScoresFromWork(imslpWork);

  // Check to see if the work is in the database
  const existingWork = await getRepository(Work)
    .createQueryBuilder('work')
    .where('work.title = :title', { title: imslpWork.title })
    .getOne();

  // If the work is already in the database:
  if (existingWork) {
    // Loop through each score,
    scores.forEach(score => {
      // check if it exists in the database,
      getRepository(Score)
        .createQueryBuilder('score')
        .where('score.url = :url', { url: score.url })
        .getOne()
        .then(existingScore => {
          // and if it doesn't, add it to the 'score' database.
          if (!existingScore) {
            score.work = existingWork;
            connection.manager.save(score);
          }
        });
    });
  }

  // If the work is not in the database:
  else {
    // Create the work database object
    const work = new Work();
    work.title = imslpWork.title;
    work.composer = imslpWork.composer;

    // Add the work to the database
    await connection.manager.save(work);

    // and add the scores for the work to the database.
    scores.forEach(score => {
      score.work = work;
      connection.manager.save(score);
    });
  }
};
