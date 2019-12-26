import { GetTodosAction, PickTodo, AddTodoAction, DeleteTodoAction } from './todos';

export enum ActionTypes {
  getTodos,
  pickTodo,
  addTodo,
  deleteTodo
}

export type Action = GetTodosAction | PickTodo | AddTodoAction | DeleteTodoAction;
