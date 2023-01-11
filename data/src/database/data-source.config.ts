import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Beach } from '../entity/beach.entity';
import { Like } from '../entity/like.entity';
import { Reply } from '../entity/reply.entity';
import { Feed } from '../entity/feed.entity';
import { User } from '../entity/user.entity';

dotenv.config();

export const dataSourceConfig = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Beach, Feed, Reply, Like],
  synchronize: true,
});
