import prisma from '@/config/db';
import repl from 'repl';

console.log('🚀 Prisma REPL started');

const replServer = repl.start({
  prompt: 'prisma> ',
  useColors: true,
});

// Make prisma available in REPL
replServer.context.prisma = prisma;

// Cleanup on exit
replServer.on('exit', async () => {
  await prisma.$disconnect();
  console.log('👋 Disconnected');
});
