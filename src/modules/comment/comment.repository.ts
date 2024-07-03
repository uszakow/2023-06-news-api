import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { checkEmptyFields } from 'src/helpers/checkEmptyFields';
import { COMMENT_STATUS_MESSAGES } from 'src/types/statusMessages';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly repository: Repository<CommentEntity>,
  ) {}

  async save(comment: CommentEntity) {
    checkEmptyFields(comment, 'comment');

    try {
      return await this.repository.save(comment);
    } catch (error) {
      throw new HttpException(
        COMMENT_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_SAVE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllComment() {
    try {
      return await this.repository.find();
    } catch (error) {
      throw new HttpException(
        COMMENT_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_FIND,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
