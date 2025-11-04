import * as todoServices from '@/services/todo.services';
import { NextFunction, Request, Response } from 'express';

export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await todoServices.getTodos();
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoList = await todoServices.createTodo(req.body);
    res.status(201).json(todoList);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoList = await todoServices.deleteTodo(req.params);

    res.status(200).json(todoList);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const todoList = await todoServices.updateTodo(req.params, req.body);
    res.status(200).json(todoList);
  } catch (err) {
    next(err);
  }
};
