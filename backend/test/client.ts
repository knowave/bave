import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';

dotenv.config();

const host = process.env.HOST;

export default class Client {
  public userId = '';
  public jwt = { accessToken: '', refreshToken: '' };
  public app = express();

  static async getInstance() {
    const client = new Client();
    await client.signUp();
    return client;
  }

  async signUp(userId: string, data?: string) {
    const signUpUrl = `${host}/sign-up`;

    let response = await request(this.app).get(`${signUpUrl}`);
    const userAccessToken = response.body.accessToken;

    response = await request(this.app).post(`${signUpUrl}`).send({ data }).set('Authorization', `Bearer${userAccessToken}`);
    const { accessToken, refreshToken } = response.body;

    this.userId = userId;
    this.jwt.accessToken = accessToken;
    this.jwt.refreshToken = refreshToken;

    return response;
  }
}
