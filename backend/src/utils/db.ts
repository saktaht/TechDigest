import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

type PrismaGlobal = typeof globalThis & {
  prisma?: PrismaClient;
};

const globalForPrisma = globalThis as PrismaGlobal;
const adapter = new PrismaPg({ connectionString });

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function initDb(retries = 5) {
  for (let i = 0; i < retries; i += 1) {
    try {
      await prisma.$connect();
      console.log('DB connected');
      return;
    } catch (err) {
      console.log(`DB connect failed (${i + 1}/${retries}), retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }

  throw new Error('DB connection failed after retries');
}

process.on('SIGTERM', () => {
  void prisma.$disconnect();
});

process.on('SIGINT', () => {
  void prisma.$disconnect();
});

export default prisma;
