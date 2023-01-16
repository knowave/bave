import dotenv from 'dotenv';
import request from 'supertest';
import express from 'express';
import { faker } from '@faker-js/faker';

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

  /**
   * 회원가입
   */
  async signUp(userId = faker.internet.userName(), data?: string) {
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

  /**
   * 해수욕장 전체 조회
   */
  async getAllBeach() {
    const beachListUrl = `${host}/beach`;

    const response = await request(this.app).get(`${beachListUrl}`);

    return response;
  }

  /**
   * 특정 해수욕장 조회
   */
  async getBeachById(beachId?: number) {
    const beachUrl = `${host}/beach/${beachId}`;
    const response = await request(this.app).get(`${beachUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장에 피드 작성
   */
  async createFeedByBeachId(beachId?: number) {
    const beachUrl = `${host}/feed/${beachId}`;
    const response = await request(this.app).post(`${beachUrl}`).send({ content: `test-feed` }).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 전체 조회
   */
  async getAllFeedByBeachId(beachId?: number) {
    const beachUrl = `${host}/feed/${beachId}`;
    const response = await request(this.app).get(`${beachUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 상세 조회
   */
  async getFeedByBeachId(beachId?: number, feedId?: number) {
    const beachUrl = `${host}/feed/${beachId}/${feedId}`;
    const response = await request(this.app).get(`${beachUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 수정
   */
  async updateFeedById(beachId?: number, feedId?: number) {
    const feedUrl = `${host}/feed/${beachId}/${feedId}`;
    const response = await request(this.app).patch(`${feedUrl}`).send({ content: 'update-feed' }).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 삭제
   */
  async deleteFeedById(beachId?: number, feedId?: number) {
    const feedUrl = `${host}/feed/${beachId}/${feedId}`;
    const response = await request(this.app).delete(`${feedUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 댓글 작성
   */
  async createReplyByBeachId(beachId?: number, feedId?: number) {
    const replyUrl = `${host}/reply/${beachId}/${feedId}`;
    const response = await request(this.app).post(`${replyUrl}`).send({ contents: 'test-reply' }).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 댓글 전체 조회
   */
  async getAllReplyByBeachId(beachId?: number, feedId?: number) {
    const replyUrl = `${host}/reply/${beachId}/${feedId}`;
    const response = await request(this.app).get(`${replyUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 댓글 수정
   */
  async updateReplyByFeed(beachId?: number, feedId?: number, replyId?: number) {
    const replyUrl = `${host}/reply/${beachId}/${feedId}/${replyId}`;
    const response = await request(this.app).patch(`${replyUrl}`).send({ contents: 'update-reply' }).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 댓글 삭제
   */
  async deleteReplyByFeed(beachId?: number, feedId?: number, replyId?: number) {
    const replyUrl = `${host}/reply/${beachId}/${feedId}/${replyId}`;
    const response = await request(this.app).delete(`${replyUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 좋아요
   */
  async insertLikeByFeed(beachId?: number, feedId?: number) {
    const likeUrl = `${host}/like/${beachId}/${feedId}`;
    const response = await request(this.app).post(`${likeUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 좋아요 취소
   */
  async cancelLikeByFeed(beachId?: number, feedId?: number, likeId?: number) {
    const likeUrl = `${host}/like/${beachId}/${feedId}/${likeId}`;
    const response = await request(this.app).post(`${likeUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 댓글 좋아요
   */
  async insertReplyLikeByFeed(beachId?: number, feedId?: number, replyId?: number) {
    const replyLikeUrl = `${host}/like/${beachId}/${feedId}/${replyId}`;
    const response = await request(this.app).post(`${replyLikeUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }

  /**
   * 특정 해수욕장 피드 댓글 좋아요 취소
   */
  async cancelReplyLikeByFeed(beachId?: number, feedId?: number, replyId?: number, likeId?: number) {
    const replyLikeUrl = `${host}/like/${beachId}.${feedId}/${replyId}/${likeId}`;
    const response = await request(this.app).post(`${replyLikeUrl}`).set('Authorization', `Bearer${this.jwt.accessToken}`);

    return response;
  }
}
