import express from 'express';
import dotenv, { DotenvConfigOutput } from 'dotenv';

export default class App {
  public app: express.Application;
  public env: DotenvConfigOutput;
  public port: any;
  constructor() {
    this.app = express();
    this.env = dotenv.config();
    this.port = process.env.PORT;
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🎉 Connected Server ${this.port}`);
    });
  }
}
