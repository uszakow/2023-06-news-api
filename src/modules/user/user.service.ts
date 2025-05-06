import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { CONST } from 'src/constants';
import { ICustomResponse } from 'src/types/customResponse.interface';
import { USER_STATUS_MESSAGES } from 'src/types/statusMessages';

import { GetUserDto } from './dto/getUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserDto } from './dto/user.dto';
import { UserTokenDto } from './dto/userToken.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userDto: UserDto): Promise<ICustomResponse> {
    const newUser = new UserEntity();

    await this.validateUser(userDto.name);
    Object.assign(newUser, userDto);

    await this.userRepository.save(newUser);

    return {
      statusCode: HttpStatus.CREATED,
      message: USER_STATUS_MESSAGES.SUCCESS.CREATED,
    };
  }

  async loginUser(userDto: UserDto): Promise<UserTokenDto> {
    const user = await this.userRepository.getUserWithPassword(userDto.name);

    const isPasswordCorrect =
      user && (await compare(userDto.password, user.password));
    if (!isPasswordCorrect) {
      throw new HttpException(
        USER_STATUS_MESSAGES.ERROR.CREDENTIALS_ARE_NOT_VALID,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      token: this.generateJwt(user),
    };
  }

  async getCurrentUser(currentUserId: string): Promise<GetUserDto> {
    const currentUser = await this.userRepository.getUserById(currentUserId);

    if (!currentUser) {
      throw new HttpException(
        USER_STATUS_MESSAGES.ERROR.USER_NOT_FOUND,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      id: currentUser.id,
      name: currentUser.name,
      news: currentUser.news.map((item) => ({
        id: item.id,
        title: item.title,
      })),
    };
  }

  async updateUser(
    userId: string,
    userDto: UpdateUserDto,
  ): Promise<ICustomResponse> {
    const user = await this.userRepository.getUserById(userId);

    if (userDto.name) {
      await this.validateUser(userDto.name);
    }

    Object.assign(user, userDto);

    await this.userRepository.save(user);

    return {
      statusCode: HttpStatus.OK,
      message: USER_STATUS_MESSAGES.SUCCESS.UPDATED,
    };
  }

  async deleteUser(userId: string): Promise<ICustomResponse> {
    await this.userRepository.delete(userId);

    return {
      statusCode: HttpStatus.OK,
      message: USER_STATUS_MESSAGES.SUCCESS.DELETED,
    };
  }

  private async validateUser(userName: string): Promise<void> {
    const userWithTheSameName = await this.userRepository.getUserByName(
      userName,
    );

    if (userWithTheSameName) {
      throw new HttpException(
        USER_STATUS_MESSAGES.ERROR.DUPLICATE_USER,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  private generateJwt(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        name: user.name,
      },
      CONST.JWT_SECRET,
      { expiresIn: '24h' },
    );
  }
}
