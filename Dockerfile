FROM nginx:1.21.4
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./build /usr/share/nginx/html
COPY ./ /app
WORKDIR /app

RUN mkdir /public/assets/uploads
RUN chown -R nobody:nobody /app
RUN chown -R nobody:nobody /public/assets/uploads
