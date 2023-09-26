FROM node:18-alpine

WORKDIR /app
# setting the working directory of the application

COPY package*.json ./
# copying package.json (root) into the WORKDIR docker images

COPY client/package*.json client/ 
RUN npm install-client --omit=dev
# dev depedencies will not be install to the custom images

COPY server/package*.json server/
RUN npm install-server --omit=dev

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD ["npm", "start", "--prefix", "server"]

EXPOSE 8000