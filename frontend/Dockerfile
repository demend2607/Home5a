FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite dev server порт 3000
EXPOSE 3000

CMD ["npm", "run", "dev"]