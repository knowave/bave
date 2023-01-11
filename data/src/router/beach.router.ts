import express, { Request, Response } from 'express';
import request from 'request';
import dotenv from 'dotenv';
import convert from 'xml-js';
import { dataSourceConfig } from '../database/data-source.config';
import { Beach } from '../entity/beach.entity';

export const router = express.Router();
const beachRepository = dataSourceConfig.getRepository(Beach);
dotenv.config();

router.get('/', async (req: Request, res: Response) => {
  const key = process.env.SERVICE_KEY;
  try {
    for(let num = 1; num <= 10; num++) {
      const requestUrl = 'https://www.meis.go.kr/service/OceansBeachInfoService/getOceansBeachInfo?serviceKey=' + key + encodeURI('&pageNo=1&numOfRows=10&SIDO_NM=전남&resultType=xml&SG_APIM=2ug8Dm9qNBfD32JLZGPN64f3EoTlkpD8kSOHWfXpyrY');
      request(requestUrl, async (error, res, body) => {
        if (error) {
          console.error(`Request Error: ${error}`);
        } else {
          const result = body;
          const xmlToJson = convert.xml2json(result, { compact: true, spaces: 4 });
          const info = JSON.parse(xmlToJson).response.body.items.item;
          // console.log('XML TO JSON : ', JSON.parse(xmlToJson).response.body.items.item[1].sidoNm._text);

          for (const i in info) {
            // console.log('RESPONSE BODY : ', info[i]);
           const beachData = await beachRepository.create({
             sidoName: info[i].sidoNm._text,
             gugun_name: info[i].gugunNm._text,
             beachName: info[i].staNm._text,
             latitude: info[i].lat._text,
             longitude: info[i].lon._text,
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
