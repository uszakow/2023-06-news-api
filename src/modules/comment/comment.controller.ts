import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';

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
  }

  @Get()
  getAllComent() {
    return this.commentService.getAllComent();
  }

  @Get('/:id')
  getCommentById() {
    return this.commentService.getCommentById();
  }
}
