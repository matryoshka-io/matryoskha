FROM tutum/nginx

RUN mkdir /var/ssl
COPY matryoshka.tech.pem /var/ssl/
COPY matryoshka.tech.key /var/ssl/

RUN rm /etc/nginx/sites-enabled/default
COPY nginx.conf /etc/nginx/sites-enabled
