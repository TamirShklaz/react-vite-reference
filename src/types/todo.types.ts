export interface TodoResponse {
  todos: Todo[];
  numTodos: number;
  next: string;
  nextCursor: string;
  limit: number;
}

export interface Todo {
  id: number;
  title: string;
  order: number;
  completed: boolean;
  url: string;
}
