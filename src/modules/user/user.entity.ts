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
