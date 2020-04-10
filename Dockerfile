FROM node:10-alpine as base

ENV PATH /opt/node_app/node_modules/.bin/:$PATH

RUN mkdir /opt/node_app/app -p && chown -R node:node /opt/node_app
WORKDIR /opt/node_app
COPY package*.json ./

RUN npm install --only=production \
    && npm cache clean --force

# DEV IMAGE
FROM base as dev

ENV NODE_ENV=development

RUN npm install --only=development

CMD ["nodemon", "--exec", "babel-node", "./src/start"]

# BUILD IMAGE
FROM base as builder

COPY . .

RUN npm run build

# PROD Image
FROM nginx:alpine as prod

ENV NODE_ENV=production

COPY --from=builder ./opt/node_app/build ./usr/share/nginx/html
