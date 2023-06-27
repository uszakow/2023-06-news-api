import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions';

const config: SqliteConnectionOptions = {
  type: 'sqlite',
  database: 'news_api_database.sqlite',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default config;
