import { Box } from "@chakra-ui/react";

import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import TodoList from "../components/todo/TodoList";

import { mockTodos } from "../data/todos";

export default function Home() {
  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <PageContainer>
        <Header />

        <SectionHeader>Tasks</SectionHeader>

        <TodoList todos={mockTodos} />
      </PageContainer>
    </Box>
  );
}
