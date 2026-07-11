import type { Todo } from "../../types/todo";
import TodoCard from "./TodoCard";

type Props = {
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}
