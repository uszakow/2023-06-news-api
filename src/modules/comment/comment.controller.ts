import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { PageOptionsDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { CommentEntity } from './comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/:newsId')
  async createComment(
    @User() currentUser: UserEntity,
    @Body() createCommentDto: CreateCommentDto,
    @Param('newsId') newsId: string,
  ) {
    return await this.commentService.createComment(
      currentUser,
      createCommentDto,
      newsId,
    );
    //TODO: można zwrócić samą wiadomość że comment został stworzony lub error jeśli jakiś jest
  }

  @Get('/user')
  async getAllUserComment(@User() currentUser: UserEntity) {
    return await this.commentService.getAllUserComment(currentUser);
  }

  @Get()
  async getAllComent(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<CommentEntity>> {
    return await this.commentService.getAllComent(pageOptionsDto);
  }

  @Get('/:id')
  getCommentById() {
    return this.commentService.getCommentById();
  }
}
