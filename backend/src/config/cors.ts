import cors, { CorsOptions } from 'cors';

const allowedOriginsProduction: string[] = [];

const ROOT = process.env.ROOT || 'http://localhost:3000';

const allowedOriginsDevelopment: string[] = [
  ROOT,
  'http://127.0.0.1:3000',
].concat(allowedOriginsProduction);

export const corsMiddleware: CorsOptions = {
  origin: (origin, callback) => {
    const env = process.env.NODE_ENV;

    const allowedOrigins =
      env === 'production'
        ? allowedOriginsProduction
        : allowedOriginsDevelopment;

    // origin が undefined → curl / Postman の場合は許可
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error(`CORS blocked: ${origin}`));
    }
  },

  credentials: false, // Cookie / 認証あり API の場合は必須
}
