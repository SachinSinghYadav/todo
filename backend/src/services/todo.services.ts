import prisma from '@/config/db';

export const getTodos = async () => {
  const todoList = await prisma.todo.findMany();
  return { todos: todoList };
};

type CreateTodoParams = {
  title: string;
  description: string;
  completed: boolean;
  priority: string;
};

export const createTodo = async ({
  title,
  description,
  completed,
  priority,
}: CreateTodoParams) => {
  await prisma.todo.create({
    data: {
      title,
      description,
      completed,
      priority,
    },
  });

  const todos = await prisma.todo.findMany();

  return { todos };
};

export const deleteTodo = async ({ id }: { id: string }) => {
  await prisma.todo.delete({ where: { id } });

  const todos = await prisma.todo.findMany();

  return { todos };
};
