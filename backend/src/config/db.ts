import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Test connection on startup
(async () => {
  try {
    await prisma.$connect();
    console.log('✅ Connected to PostgreSQL via Prisma');
  } catch (err) {
    console.error('❌ Database connection error:', err);
    process.exit(1);
  }
})();

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
