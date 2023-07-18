import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './ormconfig';
import { UserModule } from './modules/user/user.module';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { NewsModule } from './modules/news/news.module';
import { DelayMiddleware } from './middlewares/delay.middleware';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, NewsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });

    // FOR TEST PURPOSE ONLY: imitation of delay from server
    // consumer.apply(DelayMiddleware).forRoutes({
    //   path: '*',
    //   method: RequestMethod.ALL,
    // });
  }
}
