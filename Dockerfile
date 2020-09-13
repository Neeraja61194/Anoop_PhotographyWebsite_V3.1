FROM node:slim
# RUN npm install nodemon
# COPY . /opt/app/
# WORKDIR /opt/app/
# CMD ["npm","start"]

# RUN mkdir /srv/app && chown node:node /srv/app
RUN mkdir /srv/app 

# USER node

WORKDIR /srv/app

COPY package.json package-lock.json ./
# COPY --chown=node:node package.json package-lock.json ./

#RUN npm install nodemon
RUN npm install

COPY . /srv/app/

CMD ["npm", "start"]
