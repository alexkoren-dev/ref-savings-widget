FROM node:11-alpine as builder
RUN mkdir -p /app
WORKDIR /app

#copy and install node_modules
COPY package.json .
RUN yarn install --production

COPY . .

RUN yarn build

FROM nginx:1.15.8
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./vhosts.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's@__APP_BASE_URL@'"$APP_BASE_URL"'@g' /usr/share/nginx/html/static/js/main.*.js && \
nginx -g "daemon off;"
