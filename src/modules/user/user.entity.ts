import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { genSalt, hash } from 'bcrypt';
import { NewsEntity } from '../news/news.entity';
import { CommentEntity } from '../comment/comment.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => NewsEntity, (news) => news.author)
  news: NewsEntity[];

  @OneToMany(() => CommentEntity, (commnet) => commnet.author)
  comment: CommentEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const saltRounds = 10;
      const salt = await genSalt(saltRounds);
      this.password = await hash(this.password, salt);
    }
  }
}
