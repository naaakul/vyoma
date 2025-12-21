FROM node:21-slim

RUN apt-get update && \
    apt-get install -y git build-essential python3 make g++ libvips && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/user

RUN git clone https://github.com/wizzzzzzzard/box.git

WORKDIR /home/user/box

RUN npm install --no-audit --progress=false

RUN npm pkg set scripts.start="next dev"

RUN npx --yes shadcn@2.6.3 init --yes -b neutral --force || true

EXPOSE 3000

CMD ["npm", "run", "dev"]
