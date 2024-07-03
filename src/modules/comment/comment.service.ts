import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { NewsRepository } from '../news/news.repository';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { NEWS_STATUS_MESSAGES } from 'src/types/statusMessages';
import { NewsService } from '../news/news.service';

@Injectable()
export class CommentService {
  constructor(
    private readonly newsService: NewsService,
    private readonly commentRepository: CommentRepository,
  ) {}

  async createComment(
    currentUser: UserEntity,
    createCommentDto: CreateCommentDto,
    newsId: string,
  ) {
    const news = await this.newsService.getNews(newsId);
    // const news = await this.newsRepository.getNews(newsId);
    // if (!news) {
    //   throw new HttpException(
    //     NEWS_STATUS_MESSAGES.ERROR.NOT_FOUND,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);
    comment.author = currentUser;
    comment.news = news;

    const createdNews = await this.commentRepository.save(comment);
    return createdNews;
  }

  async getAllComent() {
    return this.commentRepository.getAllComment();
  }

  getCommentById() {
    return 'str';
  }
}
