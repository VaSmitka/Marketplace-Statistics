FROM node:lts as base

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8080

# Install dependencies
COPY package.json .
COPY package-lock.json .

FROM base as prod
ENV NODE_ENV=production
RUN npm ci
COPY . .
CMD [ "node", "index.js" ]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . .
CMD ["nodemon", "-L", "index.js" ]

FROM base as test
ENV NODE_ENV=test
RUN npm install -g jest && npm install
COPY . .
CMD [ "npm", "test" ]
