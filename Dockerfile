# dev Get the necessary dockerfile containing node
FROM node:18-alpine as dev

# prod
FROM dev as prod

RUN apk add --no-cache tini
# Tini is now available at /sbin/tini
ENTRYPOINT ["/sbin/tini","-v", "--"]

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn ci
COPY . .

# Build the application and run it
RUN yarn build
ENV NODE_ENV=production
CMD ["node", "server/dist/index.js"]