FROM node:14-alpine

EXPOSE 8080
STOPSIGNAL SIGINT
WORKDIR /appl
ENV NODE_ENV production

COPY package.json package-lock.json tsconfig.json /appl/
RUN npm ci

COPY frontend/ /appl/frontend/
RUN npm run build

COPY server/ /appl/server/

ENTRYPOINT npm start