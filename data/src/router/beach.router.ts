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
      const requestUrl = `https://www.meis.go.kr/service/OceansBeachInfoService/getOceansBeachInfo?serviceKey=${key}&pageNo=${num}&numOfRows=10&SIDO_NM=강원%EC%9D%B8%EC%B2%9C&resultType=json&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY`;
      request(requestUrl, async (error, res, body) => {
        if (error) {
          console.error(`Request Error: ${error}`);
        } else {
          const info = res.body.items.item;
          for (const i in info) {
            await beachRepository.create({
              beachId: Number(info[i]["num"]['_text']),
              sidoName: info[i]['sido_nm']['_text'],
              gugun_name: info[i]['gugun_nm']['_text'],
              beachName: info[i]['sta_nm']['_text'],
              latitude: info[i]['lat']['_text'],
              longitude: info[i]['lon']['_text']
            })
          }
        }
      });
      return res.send({ success: 'OK!' });
    }
  } catch (error) {
    console.error(`Router Error: ${error}`);
  }
});
