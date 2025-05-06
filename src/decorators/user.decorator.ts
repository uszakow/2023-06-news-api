import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IExpressRequest } from 'src/types/expressRequest.interface';

export const User = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<IExpressRequest>();

    if (!request.user) {
      return null;
    }

    if (key) {
      return request.user[key];
    }

    return request.user;
  },
);
