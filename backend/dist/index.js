"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cors_2 = require("./config/cors");
const db_1 = require("./utils/db");
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)(cors_2.corsMiddleware));
app.use(express_1.default.json());
app.get('/health', async (_req, res) => {
    const { rows } = await db_1.pool.query('SELECT 1 as ok');
    res.json({ ok: true, db: rows[0].ok === 1 });
});
app.listen(port, async () => {
    await (0, db_1.initDb)();
    console.log(`API server on http://localhost:${port}`);
});
