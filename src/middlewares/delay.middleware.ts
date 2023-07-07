import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  use(_req: any, _res: any, next: () => void) {
    setTimeout(next, 500);
  }
}
