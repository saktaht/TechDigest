import express from 'express';
import cors from 'cors';
import { corsMiddleware } from './config/cors';
import { initDb, pool } from './utils/db';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors(corsMiddleware));
app.use(express.json());

app.get('/health', async (_req, res) => {
  const { rows } = await pool.query('SELECT 1 as ok');
  res.json({ ok: true, db: rows[0].ok === 1 });
});

app.listen(port, async () => {
  await initDb();
  console.log(`API server on http://localhost:${port}`);
});