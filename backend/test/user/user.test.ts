import { faker } from '@faker-js/faker';
import Client from '../client';
import assert from 'assert';
import { STATUS_CODE } from '../../src/exception/status-code';

describe('User 관련 API 테스트', function () {
  describe('성공', function () {
    it('회원가입', async () => {
      const userId = faker.internet.userName();
      const data = faker.internet.userName();
      const client = new Client();
      const response = await client.signUp(userId, data);
      const payload = JSON.parse(Buffer.from(response.body.accessToken.split('.')[1], 'base64').toString('utf8'));

      assert.equal(payload['userId'], userId);
    });

    it('refresh-token 재발급', async () => {
      const userId = faker.internet.userName();
      const client = new Client();

      await client.signUp(userId);
      const response = await client.refreshToken();

      const payload = JSON.parse(Buffer.from(response.body.accessToken.split('.')[1], 'base64').toString('utf8'));
      assert.equal(payload['userId'], userId);
    });

    it('내 정보 조회', async () => {
      const client = new Client();
      const userId = faker.internet.userName();
      const data = faker.internet.userName();

      await client.signUp(userId, data);
      const response = await client.myInfo();

      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });

    it('내 정보 수정', async () => {
      const client = new Client();
      const userId = faker.internet.userName();
      await client.signUp(userId);

      const changeData = 'change-name';
      const response = await client.changeMyInfo(changeData);

      assert.equal(response.body.data, changeData);
    });
  });
});
