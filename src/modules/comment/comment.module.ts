import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { NewsRepository } from '../news/news.repository';
import { CommentEntity } from './comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from '../news/news.entity';
import { CommentRepository } from './comment.repository';
import { NewsService } from '../news/news.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService, NewsService, CommentRepository],
})
export class CommentModule {}
