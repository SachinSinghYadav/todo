import * as todoControllers from '@/controllers/todo.controllers';
import express from 'express';

const router = express.Router();

router.get('/get_todos', todoControllers.getTodos);

router.post('/create-todo', todoControllers.createTodo);

router.delete('/delete-todo/:id', todoControllers.deleteTodo);

export default router;
