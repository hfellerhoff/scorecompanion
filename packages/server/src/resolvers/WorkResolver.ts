import { Query, Resolver, Arg, Float } from 'type-graphql';
import { Work } from '../entity/Work';
import { getConnection } from 'typeorm';
import worksByTitleAndComposerQuery from './WorkResolverQueries/worksByTitleAndComposer';

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
    @Arg('composer', () => String) composer: string,
    @Arg('take', { defaultValue: 10 }) take: number,
    @Arg('skip', { defaultValue: 0 }) skip: number
  ) {
    const query = worksByTitleAndComposerQuery(title, composer);

    return query
      .skip(skip)
      .take(take)
      .getMany(); // getManyAndCount in the future
  }

  @Query(() => Float)
  async worksByTitleAndComposerCount(
    @Arg('title', () => String) title: string,
    @Arg('composer', () => String) composer: string
  ) {
    const query = worksByTitleAndComposerQuery(title, composer);

    return query.getCount();
  }
}
