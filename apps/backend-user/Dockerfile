FROM node:14.15-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:14.15-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

ARG PORT=8081
ENV PORT=${PORT}

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm", "run", "start:prod"]
