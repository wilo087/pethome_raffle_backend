FROM node:13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules dist 

RUN apk add build-base \
     python3

COPY . .

RUN yarn install 

CMD ["yarn", "prod"]