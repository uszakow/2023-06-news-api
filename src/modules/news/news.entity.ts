import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../user/user.entity';

@Entity({ name: 'news' })
export class NewsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.news, { onDelete: 'CASCADE' })
  author: UserEntity;
}
