import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsEntity } from './news.entity';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
})
export class NewsModule {}
