FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install
RUN npm install --save-dev nodemon

COPY . .

CMD ["npm", "run", "dev"]

