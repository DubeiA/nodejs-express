FROM node

RUN apt-get update && \
    apt-get install -y build-essential

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm rebuild bcrypt --build-from-source

EXPOSE 3000

CMD ["node", "server"]