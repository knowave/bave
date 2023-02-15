FROM node:16-alpine3.11

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

COPY .env ./dist/

WORKDIR ./dist

EXPOSE 8080

CMD ["yarn", "start"]
