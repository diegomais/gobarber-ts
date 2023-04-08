# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Rebuild the source code only when needed
FROM node:16-alpine as builder
WORKDIR /home/node/app
COPY . .
COPY --from=deps node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run app
FROM node:16-alpine AS app
WORKDIR /home/node/app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S node -u 1001

COPY --from=builder . .

USER node

EXPOSE 3333

CMD yarn start
