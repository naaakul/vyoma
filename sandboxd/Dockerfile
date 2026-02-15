FROM node:21-slim

# Install docker CLI (REQUIRED)
RUN apt-get update && apt-get install -y docker.io

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/server.js"]
