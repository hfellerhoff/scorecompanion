import { Query, Resolver, Arg } from 'type-graphql';
import { Work } from '../entity/Work';
import { getConnection } from 'typeorm';
// import { Score } from '../entity/Score';

@Resolver()
export class WorkResolver {
  @Query(() => [Work])
  async works() {
    const connection = getConnection();
    return connection
      .getRepository(Work)
      .createQueryBuilder('work')
      .leftJoinAndSelect('work.scores', 'score')
      .getMany();
  }

  @Query(() => [Work])
  async worksByTitle(@Arg('title', () => String) title: string) {
    const connection = getConnection();
    return connection
      .getRepository(Work)
      .createQueryBuilder('work')
      .where('work.title like :title', { title: '%' + title + '%' })
      .leftJoinAndSelect('work.scores', 'score')
      .getMany();
  }

  @Query(() => [Work])
  async worksByComposer(@Arg('composer', () => String) composer: string) {
    const connection = getConnection();
    return connection
      .getRepository(Work)
      .createQueryBuilder('work')
      .where('work.composer like :composer', { composer: '%' + composer + '%' })
      .leftJoinAndSelect('work.scores', 'score')
      .getMany();
  }

  @Query(() => [Work])
  async worksByTitleAndComposer(
    @Arg('title', () => String) title: string,
    @Arg('composer', () => String) composer: string
  ) {
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
      .leftJoinAndSelect('work.scores', 'score')
      .getMany();
  }
}
