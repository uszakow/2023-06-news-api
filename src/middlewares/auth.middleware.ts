import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { CONST } from 'src/constants';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userRepository: UserRepository) {}

  async use(req: ExpressRequestInterface, res: Response, next: NextFunction) {
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
