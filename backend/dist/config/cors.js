"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsMiddleware = void 0;
const allowedOriginsProduction = [];
const ROOT = process.env.ROOT || 'http://localhost:3000';
const allowedOriginsDevelopment = [
    ROOT,
    'http://localhost:3001',
    'http://127.0.0.1:3000',
].concat(allowedOriginsProduction);
exports.corsMiddleware = {
    origin: (origin, callback) => {
        const env = process.env.NODE_ENV;
        const allowedOrigins = env === 'production'
            ? allowedOriginsProduction
            : allowedOriginsDevelopment;
        // origin が undefined → curl / Postman の場合は許可
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        else {
            return callback(new Error(`CORS blocked: ${origin}`));
        }
    },
    credentials: false, // Cookie / 認証あり API の場合は必須
};
