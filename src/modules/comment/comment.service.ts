import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/user.entity';
import { CreateCommentDto } from './dto/createComment.dto';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { NewsService } from '../news/news.service';
import { PageDto } from 'src/common/dtos/page.dto';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';

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
    console.log(currentUser);
    const news = await this.newsService.getNews(newsId);

    const comment = new CommentEntity();
    Object.assign(comment, createCommentDto);
    comment.author = currentUser;
    comment.news = news;

    const createdNews = await this.commentRepository.save(comment);
    return createdNews;
  }

  async getAllComent(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CommentEntity>> {
    return this.commentRepository.getAllComment(pageOptionsDto);
  }

  async getAllUserComment(currentUser: UserEntity) {
    return this.commentRepository.getAllUserComment(currentUser.id);
  }

  getCommentById() {
    return 'str';
  }
}
