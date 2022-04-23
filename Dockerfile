FROM node:17.9.0-alpine3.15 as build

WORKDIR /app

ENV NODE_ENV production

COPY package.json yarn.lock .

RUN yarn 

COPY . .

RUN yarn build

FROM nginx1.12.6:alpine

COPY --from=build /app/build /app/build

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN touch /var/run/nginx.pid \
  && chown -R nginx:nginx /app /etc/nginx /var/cache/nginx /var/run/nginx.pid

USER nginx

CMD ["nginx", "-g", "daemon off;"]