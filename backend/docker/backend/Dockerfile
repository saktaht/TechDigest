# --- build stage ---
FROM node:20-alpine AS builder
WORKDIR /app

# 依存を入れる
COPY backend/package*.json ./
COPY backend/tsconfig.json ./
COPY backend/src ./src
RUN npm install
RUN npm run build

# --- runtime stage ---
FROM node:20-alpine
WORKDIR /app

COPY backend/package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app/dist ./dist

ENV PORT=4000
EXPOSE 4000
CMD ["node", "dist/index.js"]
