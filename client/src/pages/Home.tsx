import { Box } from "@chakra-ui/react";

import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import TodoList from "../components/todo/TodoList";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import EmptyState from "../components/todo/EmptyState";

import { useTodos } from "../hooks/useTodos";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";

import type { Todo } from "../types/todo";

export default function Home() {
  const { data: todos = [], isPending, error } = useTodos();

  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  function handleToggle(todo: Todo) {
    updateMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <PageContainer>
        <Header />

        <SectionHeader>Tasks</SectionHeader>

        {isPending && <Loading />}

        {error && <Error message={error.message} />}

        {!isPending && todos.length === 0 && <EmptyState />}

        {!isPending && todos.length > 0 && (
          <TodoList
            todos={todos}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        )}
      </PageContainer>
    </Box>
  );
}
