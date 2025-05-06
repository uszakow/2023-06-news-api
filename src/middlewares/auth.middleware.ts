import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { CONST } from 'src/constants';
import { UserRepository } from 'src/modules/user/user.repository';
import { IExpressRequest } from 'src/types/expressRequest.interface';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userRepository: UserRepository) {}

  async use(
    req: IExpressRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!req.headers.authorization) {
      req.user = null;
      next();

      return;
    }

    const token = req.headers.authorization.split(' ')[1];

    try {
      const decode = verify(token, CONST.JWT_SECRET);
      const user = await this.userRepository.getUserById(decode.id);
      req.user = user;
      next();
    } catch (error) {
      req.user = null;
      next();
    }
  }
}
