FROM node:14-alpine as build

ENV NODE_ENV production

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn 

COPY . ./

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html/admin
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /etc/letsencrypt/live/admin.bonsay.istmen.space/fullchain.pem /etc/letsencrypt/live/admin.bonsay.istmen.space/fullchain.pem
COPY --from=build /etc/letsencrypt/live/admin.bonsay.istmen.space/privkey.pem /etc/letsencrypt/live/admin.bonsay.istmen.space/privkey.pem

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]