import Client from '../client';
import { STATUS_CODE } from '../../src/exception/status-code';
import assert from 'assert';

describe('해수욕장 API 테스트', function () {
  // let beach: any;
  let client: Client;

  describe('성공', function () {
    before(async () => {
      client = await Client.getInstance();
      // beach = await client.getAllBeach();
    });
    it('해수욕장 전체 조회', async () => {
      const response = await client.getAllBeach();

      assert.equal(response.body.statusCode, STATUS_CODE.SUCCESS.OK);
    });
  });
});
