import { getConnection } from 'typeorm';
import { Work } from '../../entity/Work';

const worksByTitleAndComposerQuery = (title: string, composer: string) => {
  const connection = getConnection();
  return connection
    .getRepository(Work)
    .createQueryBuilder('work')
    .where('LOWER(work.title) like LOWER(:title)', {
      title: '%' + title + '%',
    })
    .andWhere('LOWER(work.composer) like LOWER(:composer)', {
      composer: '%' + composer + '%',
    })
    .leftJoinAndSelect('work.scores', 'score');
};

export default worksByTitleAndComposerQuery;
