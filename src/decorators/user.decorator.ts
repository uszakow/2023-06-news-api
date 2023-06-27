import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestInterface } from 'src/types/expressRequest.interface';

export const User = createParamDecorator(
  (key: string, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<ExpressRequestInterface>();

    if (!request.user) {
      return null;
    }

    if (key) {
      return request.user[key];
    }

    return request.user;
  },
);
