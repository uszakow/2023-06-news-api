import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { Repository } from 'typeorm';
import { checkEmptyFields } from 'src/helpers/checkEmptyFields';
import { COMMENT_STATUS_MESSAGES } from 'src/types/statusMessages';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageMetaDto } from 'src/common/dtos/PageMetaDto.dto';

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

  async getAllComment(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CommentEntity>> {
    try {
      const queryBuilder = this.repository.createQueryBuilder('comment');
      console.log('----------queryBuilder----------');
      console.log('Skip:', pageOptionsDto.skip);
      console.log('Take:', pageOptionsDto.take);
      queryBuilder
        .orderBy('comment.createdAt', pageOptionsDto.order)
        .skip(pageOptionsDto.skip)
        .take(pageOptionsDto.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      console.log('----------item----------');
      console.log('Item count:', itemCount);
      console.log('Entities:', entities);

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
      console.log('PageMetaDto:', pageMetaDto);

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      throw new HttpException(
        COMMENT_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_FIND,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUserComment(userId: string) {
    try {
      return await this.repository.find({
        where: { author: { id: userId } },
      });
    } catch (error) {
      throw new HttpException(
        COMMENT_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_FIND,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
