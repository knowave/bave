import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();
export const connectionOptions = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User],
});

export default connectionOptions;
