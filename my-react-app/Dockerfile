FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

ARG REACT_APP_API_URL=http://localhost:4000
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

RUN npm run build

CMD ["npx", "serve", "-s", "build", "-l", "3000"]