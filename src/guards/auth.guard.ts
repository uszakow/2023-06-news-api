import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';
import { USER_STATUS_MESSAGES } from 'src/types/statusMessages';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();

    if (!request.user) {
      throw new HttpException(
        USER_STATUS_MESSAGES.ERROR.NOT_AUTHORIZED,
        HttpStatus.UNAUTHORIZED,
      );
    }

    return true;
  }
}
