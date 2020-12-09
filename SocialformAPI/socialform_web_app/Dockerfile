FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./socialform_web_app/package.json ./
COPY ./socialform_web_app/package-lock.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY ./socialform_web_app ./

CMD ["npm", "start"]