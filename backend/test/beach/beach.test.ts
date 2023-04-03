import Client from '../client';
import { STATUS_CODE } from '../../src/exception/status-code';
import * as assert from 'assert';
import {before} from "node:test";

describe('해수욕장 API 테스트', function () {
  let beach: any;
  let feed: any;
  let reply: any;
  let like: any;

  let beachId: number;
  let feedId: number;
  let replyId: number;
  let likeId: number;

  let client: Client;

  describe('성공', function () {
    beforeAll(async () => {
      client = await Client.getInstance();
      beach = await client.getAllBeach();
      feed = await client.createFeedByBeachId();
      reply = await client.createReplyByBeachId();
      like = await client.insertLikeByFeed();

      beachId = beach.body.id;
      feedId = feed.body.id;
      replyId = reply.body.id;
      likeId = like.body.id;
    });

    it('해수욕장 전체 조회', async () => {
      const response = await client.getAllBeach();
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 조회', async () => {
      const response = await client.getBeachById(beachId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장에 피드 작성', async () => {
      const response = await client.createFeedByBeachId(beachId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.CREATED);
    });

    it('특정 해수욕장 피드 전체 조회', async () => {
      const response = await client.getAllFeedByBeachId(beachId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 피드 상세 조회', async () => {
      const response = await client.getFeedByBeachId(beachId, feedId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 피드 수정', async () => {
      const response = await client.updateFeedById(beachId, feedId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 피드 삭제', async () => {
      const response = await client.deleteFeedById(beachId, feedId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 피드 댓글 작성', async () => {
      const response = await client.createReplyByBeachId(beachId, feedId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.CREATED);
    });

    it('특정 해수욕장 피드 댓글 전체 조회', async () => {
      const response = await client.getAllReplyByBeachId(beachId, feedId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 피드 댓글 수정', async () => {
      const response = await client.updateReplyByFeed(beachId, feedId, replyId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 피드 댓글 삭제', async () => {
      const response = await client.deleteReplyByFeed(beachId, feedId, replyId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 피드 좋아요', async () => {
      const response = await client.insertLikeByFeed(beachId, feedId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.CREATED);
    });

    it('특정 해수욕장 피드 좋아요 취소', async () => {
      const response = await client.cancelLikeByFeed(beachId, feedId, likeId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('특정 해수욕장 피드 댓글 좋아요', async () => {
      const response = await client.insertReplyLikeByFeed(beachId, feedId, replyId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.CREATED);
    });

    it('특정 해수욕장 피드 댓글 좋아요 취소', async () => {
      const response = await client.cancelReplyLikeByFeed(beachId, feedId, replyId, likeId);
      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });
  });
});
