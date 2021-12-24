FROM node

WORKDIR /web-app

COPY package.json .
COPY node_modules ./node_modules
COPY public ./public
COPY src ./src

EXPOSE 3000

CMD ["npm","start"]