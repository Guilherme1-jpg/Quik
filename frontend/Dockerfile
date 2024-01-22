FROM node:alpine

WORKDIR /app

COPY . .

RUN npm i
RUN npm run build

EXPOSE 3017

CMD ["npm", "run", "start"]
