import type { Todo } from "../../types/todo";

import TodoCard from "./TodoCard";

type Props = {
  todos: Todo[];
};

export default function TodoList({ todos }: Props) {
  return (
    <>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </>
  );
}
