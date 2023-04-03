FROM node:16-alpine3.11

RUN mkdir -p /app

WORKDIR /app

COPY package.json .

COPY yarn.lock .

RUN yarn install

COPY . .

RUN yarn build

COPY .env .

EXPOSE 8080

CMD ["yarn", "start"]
