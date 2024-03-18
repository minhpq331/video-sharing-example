FROM node:20-alpine as builder

ENV NODE_ENV build

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --omit=dev

FROM node:20-alpine

ENV NODE_ENV production

USER node
WORKDIR /home/node

EXPOSE 8080
ENV PORT 8080
ENV HOST 0.0.0.0

COPY --from=builder --chown=node:node /home/node/package*.json /home/node/nuxt.config.js ./
COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /home/node/.nuxt/ ./.nuxt/
COPY --from=builder --chown=node:node /home/node/static/ ./static/

CMD ["npm", "run", "start"]