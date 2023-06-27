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
import { UserService } from './user.service';
import { CustomResponseInterface } from 'src/types/customResponse.interface';
import { UserTokenDto } from './dto/userToken.dto';
import { GetUserDto } from './dto/getUser.dto';
import { User } from 'src/decorators/user.decorator';
import { UserEntity } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createUser(@Body() userDto: UserDto): Promise<CustomResponseInterface> {
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
    @User() currentUser: UserEntity,
    @Body() userDto: UpdateUserDto,
  ): Promise<CustomResponseInterface> {
    return await this.userService.updateUser(currentUser, userDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  async deleteUser(
    @User('id') currentUserId: string,
  ): Promise<CustomResponseInterface> {
    return await this.userService.deleteUser(currentUserId);
  }
}
