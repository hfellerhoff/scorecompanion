import { Query, Float, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { Work } from '../entity/Work';
import { Score } from '../entity/Score';

@Resolver()
export class CountResolver {
  @Query(() => Float)
  async workCount() {
    const connection = getConnection();
    return connection
      .getRepository(Work)
      .createQueryBuilder('work')
      .getCount();
  }

  @Query(() => Float)
  async scoreCount() {
    const connection = getConnection();
    return connection
      .getRepository(Score)
      .createQueryBuilder('score')
      .getCount();
  }

  @Query(() => Float)
  async siteCount() {
    const connection = getConnection();
    const result = await connection
      .getRepository(Work)
      .createQueryBuilder('work')
      .select('COUNT(DISTINCT site)')
      .getRawOne();
    return result.count;
  }
}
