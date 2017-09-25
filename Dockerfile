FROM node:6-alpine

COPY infra/root /var/spool/cron/crontabs/root

ADD app /xmlvalidator/app
ADD app.js /xmlvalidator/app.js
ADD package.json /xmlvalidator/package.json

RUN cd /xmlvalidator \
&& npm install

CMD ["crond", "-fS"]