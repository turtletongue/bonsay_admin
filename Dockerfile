FROM node:14-alpine as build

ENV NODE_ENV production

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn 

COPY . ./

RUN yarn build

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html/admin
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]