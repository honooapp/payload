FROM node:18-alpine as base

FROM base as builder

WORKDIR /home/node
COPY package*.json ./

COPY . .
RUN yarn install
RUN yarn build

FROM base as runtime

ENV NODE_ENV=production
ENV PAYLOAD_SECRET=8bdd4966772390d05923c2a9
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ENV MONGODB_URI=mongodb+srv://doadmin:3n7f2058Avc64ewV@aretamap-mongo-4d960af0.mongo.ondigitalocean.com/aretamap?tls=true&authSource=admin&replicaSet=aretamap-mongo
# ENV SERVER_URL=http://164.90.236.172

RUN echo "nameserver 8.8.8.8" > /etc/resolv.conf
RUN echo "nameserver 4.4.4.4" > /etc/resolv.conf

WORKDIR /home/node
COPY package*.json  ./

RUN yarn install --production
COPY --from=builder /home/node/dist ./dist
COPY --from=builder /home/node/build ./build

EXPOSE 3000

CMD ["node", "dist/server.js"]