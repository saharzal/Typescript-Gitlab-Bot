FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:18-alpine AS final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
ENV REDIS_CONNECTION_URL=xxxx
ENV BALE_BOT_TOKEN=xxxx
RUN yarn install --production
CMD [ "yarn", "start" ]