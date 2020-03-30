import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Score } from './Score';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Work extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  title: string;

  @Field()
  @Column({ nullable: false })
  composer: string;

  @Field()
  @Column({ nullable: false })
  site: string;

  @Field()
  @Column({ nullable: true })
  workUrl: string;

  @Field(() => [Score])
  @OneToMany(
    _type => Score,
    score => score.work,
    {
      nullable: true,
    }
  )
  scores: Score[];
}
