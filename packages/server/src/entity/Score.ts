import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Work } from './Work';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity()
export class Score extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column({ nullable: true })
  title: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field(() => Work)
  @ManyToOne(
    _type => Work,
    work => work.scores
  )
  work: Work;
}
