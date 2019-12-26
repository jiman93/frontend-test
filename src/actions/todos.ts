import { ActionTypes } from './types';

export interface Todo {
  id: string;
  name: string;
  selected: boolean;
}

export interface GetTodosAction {
  type: ActionTypes.getTodos;
  payload: Todo[];
}

export interface DeleteTodoAction {
  type: ActionTypes.deleteTodo;
  payload: string;
}

export interface AddTodoAction {
  type: ActionTypes.addTodo;
  payload: Todo;
}

export interface PickTodo {
  type: ActionTypes.pickTodo;
  payload: Todo;
}

export const getTodos = (todos: Todo[]) => {
  return {
    type: ActionTypes.getTodos,
    payload: todos
  };
};

export const pickTodo = (todo: Todo): PickTodo => {
  return {
    type: ActionTypes.pickTodo,
    payload: todo
  };
};

export const addTodo = (todo: Todo): AddTodoAction => {
  return {
    type: ActionTypes.addTodo,
    payload: todo
  };
};

export const deleteTodo = (id: string): DeleteTodoAction => {
  return {
    type: ActionTypes.deleteTodo,
    payload: id
  };
};
