FROM node:latest

RUN mkdir /app
WORKDIR /app
ADD . .

ENV NODE_ENV=production
RUN npm ci

USER node

EXPOSE 8080

CMD [ "node", "dist/index.js" ]