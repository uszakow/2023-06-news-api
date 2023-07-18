import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsEntity } from './news.entity';
import { DeleteResult, Repository } from 'typeorm';
import { NEWS_STATUS_MESSAGES } from 'src/types/statusMessages';
import { checkEmptyFields } from 'src/helpers/checkEmptyFields';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(NewsEntity)
    private readonly repository: Repository<NewsEntity>,
  ) {}

  async save(news: NewsEntity): Promise<NewsEntity> {
    checkEmptyFields(news, 'news');

    try {
      return await this.repository.save(news);
    } catch (error) {
      throw new HttpException(
        NEWS_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_SAVE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(newsId: string): Promise<DeleteResult> {
    checkEmptyFields(newsId, 'newsId');

    try {
      return await this.repository.delete(newsId);
    } catch (error) {
      throw new HttpException(
        NEWS_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_DELETE,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllNews(): Promise<NewsEntity[]> {
    try {
      return await this.repository.find({
        relations: ['author'],
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      throw new HttpException(
        NEWS_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_FIND,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getNews(id: string): Promise<NewsEntity> {
    checkEmptyFields(id, 'id');

    try {
      return await this.repository.findOne({
        where: { id },
        relations: ['author'],
      });
    } catch (error) {
      throw new HttpException(
        NEWS_STATUS_MESSAGES.ERROR.DATABASE_ERROR_WHILE_FIND,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
