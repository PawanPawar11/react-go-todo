import api from "./axios";
import type { Todo } from "../types/todo";

export async function getTodos(): Promise<Todo[]> {
  const { data } = await api.get<Todo[]>("/todos");
  return data;
}

export async function createTodo(body: string): Promise<Todo> {
  const { data } = await api.post<Todo>("/todos", {
    body,
    completed: false,
  });

  return data;
}

export async function updateTodo(id: string, completed: boolean) {
  const { data } = await api.patch(`/todos/${id}`, {
    completed,
  });

  return data;
}

export async function deleteTodo(id: string) {
  const { data } = await api.delete(`/todos/${id}`);

  return data;
}
