FROM node:18-alpine

WORKDIR /usr/src/my-app

COPY my-app/package*.json ./
RUN npm install

COPY my-app/. .

CMD ["npm", "run", "start:dev"]
