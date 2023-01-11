import express, { Request, Response } from 'express';
import request from 'request';
import dotenv from 'dotenv';
import { dataSourceConfig } from '../database/data-source.config';
import { Beach } from '../entity/beach.entity';

export const router = express.Router();
const beachRepository = dataSourceConfig.getRepository(Beach);
dotenv.config();

router.get('/', async (req: Request, res: Response) => {
  const key = process.env.SERVICE_KEY;
  try {
    for(let num = 1; num <= 10; num++) {
      const requestUrl = 'https://www.meis.go.kr/service/OceansBeachInfoService/getOceansBeachInfo?serviceKey=' + key + encodeURI('&pageNo=1&numOfRows=10&SIDO_NM=강원&resultType=json&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY');
      request(requestUrl, async (error, res, body) => {
        if (error) {
          console.error(`Request Error: ${error}`);
        } else {
          const info = res.body;
          console.log('INFO: ', res.body.item);
          for (const i in info) {
            console.log('RESPONSE BODY : ', info[i]);
           const beachData = await beachRepository.create({
             sidoName: info[i]['sido_nm'],
             gugun_name: info[i]['gugun_nm'],
             beachName: info[i]['sta_nm'],
             latitude: info[i]['lat'],
             longitude: info[i]['lon']
           });
           await beachRepository.save(beachData);
          }
        }
      });
      return res.send({ success: 'OK!' });
    }
  } catch (error) {
    console.error(`Router Error: ${error}`);
  }
});
