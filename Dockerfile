FROM node:slim

RUN mkdir /srv/app 

# USER node

WORKDIR /srv/app

COPY package.json package-lock.json ./

RUN npm install

COPY . /srv/app/

CMD ["npm", "start"]
