FROM node:20-alpine

RUN addgroup app && adduser -S -G app app
USER app

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install --save-dev nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

