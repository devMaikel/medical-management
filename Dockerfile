FROM node:lts-alpine
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 3001
# CMD [ "npm", "run", "start:dev"]
