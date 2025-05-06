import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ICustomResponse } from 'src/types/customResponse.interface';

import { UserEntity } from '../user/user.entity';
import { CreateNewsDto } from './dto/createNews.dto';
import { GetNewsDto } from './dto/getNews.dto';
import { UpdateNewsDto } from './dto/updateNews.dto';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard)
  async createNews(
    @User() currentUser: UserEntity,
    @Body() createNewsDto: CreateNewsDto,
  ): Promise<GetNewsDto> {
    return await this.newsService.createNews(currentUser, createNewsDto);
  }

  @Get()
  async getAllNews(): Promise<GetNewsDto[]> {
    return await this.newsService.getAllNews();
  }

  @Get('/:newsId')
  async getNews(@Param('newsId') newsId: string): Promise<GetNewsDto> {
    return await this.newsService.getNews(newsId);
  }

  @Put('/:newsId')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard)
  async updateNews(
    @User('id') currentUserId: string,
    @Param('newsId') newsId: string,
    @Body() updateNewsDto: UpdateNewsDto,
  ): Promise<GetNewsDto> {
    return await this.newsService.updateNews(
      newsId,
      updateNewsDto,
      currentUserId,
    );
  }

  @Delete('/:newsId')
  @UseGuards(AuthGuard)
  async deleteNews(
    @User('id') currentUserId: string,
    @Param('newsId') newsId: string,
  ): Promise<ICustomResponse> {
    return await this.newsService.deleteNews(newsId, currentUserId);
  }
}
