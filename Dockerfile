FROM node:boron

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .
COPY ./config/serviceAccountKey.json ./config/

EXPOSE 3000

CMD [ "npm", "start" ]
