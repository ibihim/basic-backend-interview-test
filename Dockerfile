FROM node

RUN mkdir /app
WORKDIR /app

ADD package.json .
RUN npm config set registry http://registry.npmjs.org
RUN npm install && npm ls

ENV API_KEY N7LkblDsc5aen05FJqBQ8wU4qSdmsftwJagVK7UD
ENV PORT 8000

ADD . /app

CMD ["node", "index.js"]
