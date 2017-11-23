FROM node:8.9.1-alpine

RUN mkdir ./shop_back
WORKDIR ./shop_back

COPY package-lock.json ./
COPY package.json ./

RUN npm config set registry http://registry.npmjs.org/
RUN npm install 

COPY ./ ./

EXPOSE 3000

ENTRYPOINT ["node"]

CMD ["index.js"]