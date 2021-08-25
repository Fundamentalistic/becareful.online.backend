MAINTAINER a.vi.bespalov@gmail.com <Andrei Bespalov>
FROM debian:10
WORKDIR /server
COPY nginx.conf /etc/nginx/sties-enabled/default
VOLUME ["/server"]
COPY . .
RUN su - && apt update -y && apt upgrade -y && apt install \\
php php-common php-gd php-mbstring php-tokenizer php-mysql php-curl nginx composer npm php-fpm -y \\
&& composer install && npm install
ENTRYPOINT service nginx start
