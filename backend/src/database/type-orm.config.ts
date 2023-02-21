import { DataSource } from 'typeorm';
import { Users } from '../domains/user/entity/user.entity';
import * as dotenv from 'dotenv';
import { Beach } from '../domains/beach/entity/beach.entity';
import { Feed } from '../domains/feed/entity/feed.entity';
import { Reply } from '../domains/reply/entity/reply.entity';
import { Bookmark } from '../domains/bookmark/entity/bookmark.entity';
import { Like } from '../domains/like/entity/like.entity';

dotenv.config();
export const connectionOptions = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Users, Beach, Feed, Reply, Bookmark, Like],
});

export default connectionOptions;
