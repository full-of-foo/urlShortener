FROM ubuntu:16.04

##### Linux and Node
ENV DEBIAN_FRONTEND noninteractive
ENV NPM_CONFIG_LOGLEVEL info
RUN set -ex \
  && apt-get update \
  && apt-get install -y --force-yes apt-utils curl git \
  && curl -sL https://deb.nodesource.com/setup_6.x | bash - \
  && apt-get install --force-yes -y nodejs \
  && npm config set registry https://registry.npmjs.org/ \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get purge -y --auto-remove apt-utils curl

##### App
COPY url-shortener-fe/package.json /tmp/package.json
RUN set -ex \
  && cd /tmp \
  && npm install \
  && mkdir -p /url-shortener-fe /url-shortener-fe/templates /url-shortener-fe/client \
  && cp -a /tmp/node_modules /url-shortener-fe/

WORKDIR /url-shortener-fe

COPY url-shortener-fe/client/ /url-shortener-fe/client/
COPY url-shortener-fe/templates/ /url-shortener-fe/templates/
COPY url-shortener-fe/server.js /url-shortener-fe/

RUN rm -fr /var/lib/apt/lists/*

CMD ["node", "--harmony", "server.js"]
