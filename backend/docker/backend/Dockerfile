# --- ビルドステージ ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY backend/package*.json ./
COPY backend/tsconfig.json ./
COPY backend/src ./src
COPY backend/prisma ./prisma
COPY backend/prisma.config.ts ./
RUN npm install
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npm run generate
RUN npm run build

# --- ランタイムステージ(動かすだけだから、dev系は不要でビルドしたものを使う) ---
FROM node:20-alpine
WORKDIR /app

COPY backend/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

COPY backend/prisma ./prisma
COPY backend/prisma.config.ts ./
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"

RUN npx prisma generate

ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/index.js"]
