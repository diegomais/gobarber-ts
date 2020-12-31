FROM node:12
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD yarn start
EXPOSE 3000
