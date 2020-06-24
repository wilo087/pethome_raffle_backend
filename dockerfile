FROM node:lts-alpine3.11

WORKDIR /usr/src/app

COPY package*.json ./

RUN rm -rf node_modules dist 

RUN apk add build-base \
     python3

COPY . .

RUN yarn install
RUN yarn remove \
   compile \
   copy-gql 

CMD ["yarn", "server"]
