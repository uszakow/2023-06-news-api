import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { checkNewsPermission } from 'src/helpers/checkNewsPermission';
import { UserEntity } from 'src/modules/user/user.entity';
import { ICustomResponse } from 'src/types/customResponse.interface';
import { NEWS_STATUS_MESSAGES } from 'src/types/statusMessages';

import { CreateNewsDto } from './dto/createNews.dto';
import { GetNewsDto } from './dto/getNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import { NewsEntity } from './news.entity';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async createNews(
    currentUser: UserEntity,
    createNewsDto: CreateNewsDto,
  ): Promise<GetNewsDto> {
    const news = new NewsEntity();
    Object.assign(news, createNewsDto);

    news.author = currentUser;

    const createdNews = await this.newsRepository.save(news);

    return this.buildNewsResponse(createdNews);
  }

  async getAllNews(): Promise<GetNewsDto[]> {
    const news = await this.newsRepository.getAllNews();

    return news.map((item) => this.buildNewsResponse(item));
  }

  async getNews(newsId: string): Promise<GetNewsDto> {
    const news = await this.newsRepository.getNews(newsId);

    if (!news) {
      throw new HttpException(
        NEWS_STATUS_MESSAGES.ERROR.NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.buildNewsResponse(news);
  }

  async updateNews(
    newsId: string,
    updateNewsDto: UpdateNewsDto,
    currentUserId: string,
  ): Promise<GetNewsDto> {
    const news = await this.newsRepository.getNews(newsId);
    Object.assign(news, updateNewsDto);
    checkNewsPermission(news, currentUserId);

    const updatedNews = await this.newsRepository.save(news);

    return this.buildNewsResponse(updatedNews);
  }

  async deleteNews(
    newsId: string,
    currentUserId: string,
  ): Promise<ICustomResponse> {
    const news = await this.newsRepository.getNews(newsId);
    checkNewsPermission(news, currentUserId);

    await this.newsRepository.delete(newsId);

    return {
      statusCode: HttpStatus.OK,
      message: NEWS_STATUS_MESSAGES.SUCCESS.DELETE,
    };
  }

  private buildNewsResponse(news: NewsEntity): GetNewsDto {
    return {
      id: news.id,
      title: news.title,
      content: news.content,
      author: {
        id: news.author.id,
        name: news.author.name,
      },
    };
  }
}
