import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { DeleteResult, ObjectLiteral, Repository } from 'typeorm';
import { USER_STATUS_MESSAGES } from 'src/types/statusMessages';
import { checkEmptyFields } from 'src/helpers/checkEmptyFields';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async save(user: UserEntity): Promise<UserEntity> {
    checkEmptyFields(user, 'user');

    try {
      return await this.repository.save(user);
    } catch (error) {
      throw new HttpException(
        USER_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_SAVE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(userId: string): Promise<DeleteResult> {
    checkEmptyFields(userId, 'userId');

    try {
      return await this.repository.delete(userId);
    } catch (error) {
      throw new HttpException(
        USER_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_DELETE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async getUser(query: ObjectLiteral): Promise<UserEntity | null> {
    try {
      return await this.repository.findOne(query);
    } catch (error) {
      throw new HttpException(
        USER_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_FIND,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUserByName(name: string): Promise<UserEntity | null> {
    checkEmptyFields(name, 'name');

    return await this.getUser({
      where: { name },
    });
  }

  async getUserWithPassword(name: string): Promise<UserEntity | null> {
    checkEmptyFields(name, 'name');

    return await this.getUser({
      where: { name },
      select: ['id', 'name', 'password'],
    });
  }

  async getUserById(id: string): Promise<UserEntity | null> {
    checkEmptyFields(id, 'id');

    try {
      return await this.getUser({
        where: { id },
        relations: ['news'],
      });
    } catch (error) {
      throw new HttpException(
        USER_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_FIND,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
