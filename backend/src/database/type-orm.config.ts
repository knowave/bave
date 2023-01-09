import { DataSource } from 'typeorm';
import { User } from '../entity/user.entity';

export const connectionOptions = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: 'root',
  password: 'root',
  database: 'bave',
  synchronize: true,
  logging: true,
  entities: [User],
});

export default connectionOptions;
