FROM node:22-alpine AS dev
WORKDIR /app

COPY backend/package*.json ./
COPY backend/prisma ./prisma
COPY backend/prisma.config.ts ./
RUN npm install

ENV NODE_ENV=development
ENV PORT=4000

EXPOSE 4000 5555