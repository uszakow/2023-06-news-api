import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  use(_req: Request, _res: Response, next: () => void): void {
    setTimeout(next, 500);
  }
}
