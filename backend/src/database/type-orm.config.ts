import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import * as dotenv from 'dotenv';
import { Beach } from '../entity/beach.entity';
import { Feed } from '../entity/feed.entity';
import { Reply } from '../entity/reply.entity';
import { Like } from '../entity/like.entity';

dotenv.config();
export const connectionOptions = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logging: false,
  entities: [User, Beach, Feed, Reply, Like],
});

export default connectionOptions;
