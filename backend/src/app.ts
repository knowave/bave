import express from 'express';
import dotenv, { DotenvConfigOutput } from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { createConnection } from 'typeorm';

export default class App {
  public app: express.Application;
  public env: DotenvConfigOutput;
  public port: number;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.env = dotenv.config();
    this.port = Number(process.env.PORT);
  }

  public swagger() {
    const swaggerDefinition = {
      info: {
        title: 'bave-api-docs',
        version: '0.1.0',
        description: 'BAVE API Docs',
      },
      host: `localhost:${this.port}`,
      basePath: '/',
    };

    const option = {
      swaggerDefinition: swaggerDefinition,
      apis: [__dirname + '/../controller/*.ts'],
    };

    const spec = swaggerJsdoc(option);

    this.app.use('/bave-api', swaggerUi.serve, swaggerUi.setup(spec));
  }

  public async connectionDB(): Promise<void> {
    createConnection()
      .then((connection) => {
        console.log('Connected to the DataBase Successfully');
      })
      .catch((error) => {
        console.log(`Error : ${error}`);
      });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🎉 Connected Server http://localhost:${this.port}`);
    });
  }
}
