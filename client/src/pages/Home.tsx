import { Box } from "@chakra-ui/react";

import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import TodoList from "../components/todo/TodoList";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import EmptyState from "../components/todo/EmptyState";

import { useTodos } from "../hooks/useTodos";

export default function Home() {
  const { data: todos, isPending, error } = useTodos();

  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <PageContainer>
        <Header />

        <SectionHeader>Tasks</SectionHeader>

        {isPending && <Loading />}

        {error && <Error message={error.message} />}

        {todos && todos.length === 0 && <EmptyState />}

        {todos && todos.length > 0 && <TodoList todos={todos} />}
      </PageContainer>
    </Box>
  );
}
