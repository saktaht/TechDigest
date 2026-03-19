import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

export const pool = new Pool({ connectionString });

export async function initDb(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      await client.query('SELECT 1');
      client.release();
      console.log('DB connected');
      return;
    } catch (err) {
      console.log(`DB connect failed (${i + 1}/${retries}), retrying...`);
      await new Promise(res => setTimeout(res, 1000 * (i + 1)));
    }
  }
  throw new Error('DB connection failed after retries');
}


// アプリ終了時にクリーンアップ
process.on('SIGTERM', () => pool.end());
process.on('SIGINT', () => pool.end());
