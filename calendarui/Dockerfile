FROM node:16.14-alpine AS build

WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

COPY src/ src
COPY .neutrinorc.js .neutrinorc.js
COPY webpack.config.js webpack.config.js

RUN npm run build

CMD ["npm", "run", "start:server"]