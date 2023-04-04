## Bave Project 개요

---

1. 여름철 유명한 해수욕장 외 여러 해수욕장 정보 공유.
2. 지도 기반의 프로젝트를 하면서 SNS 성격을 띈 프로젝트를 만들어보고 싶었다.
3. SNS 비슷한 프로젝트를 만들면서 회사의 서비스 서버 로직에 대한 이해.
4. Server 개발 시 API를 빠르고 안정적이게 만들 수 있게 연습하는 프로젝트.
   1. FrontEnd는 개발 미정 상태.

## API 명세서

[API](https://www.notion.so/313d3e091d1c4e5b90bbd441d6a8f043)

---

## ERD

![스크린샷 2023-02-16 오후 5.00.46.png](https://file.notion.so/f/s/ed62e811-5842-4caa-9d8b-5ccb5d172fc8/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2023-02-16_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.00.46.png?id=abc365a9-b657-4c6a-9741-1e990aa50a51&table=block&spaceId=053b970c-3416-464d-9bb2-f3c9b9bc701a&expirationTimestamp=1680593638572&signature=S1_Dq508TnfOOw1zyDeAxnuGLeoDpvyb1eebfIu2rW4&downloadName=%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2023-02-16+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+5.00.46.png)

---

## Skill Stack

---

| skill   | Description                                | Version  |
| ------- | ------------------------------------------ | -------- |
| Express | Node.js Framework.                         | 4.18.2   |
| Mysql2  | 참조관계가 많은 데이터 특성 상 MySQL 사용. | 2.3.3    |
| Swagger | API 문서화                                 | 4.6.0    |
| AWS-CDK | S3를 사용해서 image를 담기 위함            | 2.1313.0 |
| xml-js  | xml to json                                | 1.6.11   |
| dotenv  | DB 및 여러 key 정보 유출 방지              | 16.0.3   |
| TypeORM | DataBase ORM 사용                          | 0.3.11   |
| Jest    | Test Code                                  | 29.4.3   |

## Feature

- 전국 해수욕장 Open API에서 가져온 정보를 제공
- 관심있는 해수욕장 북마크, 좋아요 기능
  - 이를 관리하는 마이페이지 제공
- 해당 해수욕장 클릭 시 유저가 올린 피드 공개
- 지도 기반의 웹 사이트
- 피드 전채 공개
