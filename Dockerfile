# build stage
FROM node:16.19.0 as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install --silent
COPY . /app
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/dist/regEx /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80