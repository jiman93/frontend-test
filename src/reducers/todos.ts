import { Todo, Action, ActionTypes } from '../actions';

export const todosReducer = (state: Todo[] = [], action: Action) => {
  switch (action.type) {
    case ActionTypes.getTodos:
      return action.payload;
    case ActionTypes.pickTodo:
      return [...state, action.payload];
    case ActionTypes.addTodo:
      return [...state, action.payload];
    case ActionTypes.deleteTodo:
      return state.filter((todo: Todo) => todo.id !== action.payload);
    default:
      return state;
  }
};
