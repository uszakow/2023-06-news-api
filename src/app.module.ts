import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { NewsModule } from './modules/news/news.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, NewsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
