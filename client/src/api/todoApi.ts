import api from "./axios";
import type { Todo } from "../types/todo";

export async function getTodos(): Promise<Todo[]> {
  const response = await api.get<Todo[]>("/todos");
  return response.data;
}
