import express from 'express';
import cors from 'cors';
import { corsMiddleware } from './config/cors';
import prisma, { initDb } from './utils/db';
import routes from './router';

const server = express();
const port = process.env.PORT || 4000;

server.use(cors(corsMiddleware));
server.use(express.json());

server.get('/health', async (_req, res) => {
  const rows = await prisma.$queryRaw<Array<{ ok: number }>>`SELECT 1 as ok`;
  res.json({ ok: true, db: rows[0]?.ok === 1 });
});

server.listen(port, async () => {
  await initDb();
  console.log(`API server on http://localhost:${port}`);
});

routes(server);
