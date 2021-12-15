FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY node_modules .
COPY public .
COPY src .

EXPOSE 3000

CMD ["npm","start"]