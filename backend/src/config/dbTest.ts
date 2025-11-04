// test-create-todo.ts
import prisma from './db';

async function testCreate() {
  const allTodos = await prisma.todo.findMany();
  console.log('All todos:', allTodos);

  const all = await prisma.todo.count();
  console.log('alllllll', all);

  await prisma.$disconnect();
}

testCreate();
