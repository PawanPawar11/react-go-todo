import api from "./axios";
import type { Todo } from "../types/todo";

export async function getTodos(): Promise<Todo[]> {
  const { data } = await api.get<Todo[]>("/todos");
  return data;
}

export async function createTodo(body: string): Promise<Todo> {
  const { data } = await api.post<Todo>("/todos", {
    body,
  });

  return data;
}

export async function updateTodo(
  id: string,
  updates: { body?: string; completed?: boolean },
): Promise<Todo> {
  const { data } = await api.patch<Todo>(`/todos/${id}`, updates);

  return data;
}

export async function deleteTodo(id: string): Promise<void> {
  await api.delete(`/todos/${id}`);
}
