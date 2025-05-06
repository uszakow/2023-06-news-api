import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { ICustomResponse } from 'src/types/customResponse.interface';

import { GetUserDto } from './dto/getUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { UserTokenDto } from './dto/userToken.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createUser(@Body() userDto: UserDto): Promise<ICustomResponse> {
    return await this.userService.createUser(userDto);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async loginUser(@Body() userDto: UserDto): Promise<UserTokenDto> {
    return await this.userService.loginUser(userDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getCurrentUser(@User('id') currentUserId: string): Promise<GetUserDto> {
    return this.userService.getCurrentUser(currentUserId);
  }

  @Put()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id') currentUserId: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<ICustomResponse> {
    return await this.userService.updateUser(currentUserId, userDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(
    @User('id') currentUserId: string,
  ): Promise<ICustomResponse> {
    return await this.userService.deleteUser(currentUserId);
  }
}
