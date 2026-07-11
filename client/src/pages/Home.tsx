import { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Stack,
  Text,
  Center,
  Flex,
  Heading,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";
import TodoList from "../components/todo/TodoList";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";
import EmptyState from "../components/todo/EmptyState";
import SearchBar from "../components/todo/SearchBar";

import { useTodos } from "../hooks/useTodos";
import { useUpdateTodo } from "../hooks/useUpdateTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodo";

import type { Todo } from "../types/todo";

export default function Home() {
  const { data: todos = [], isPending, error } = useTodos();

  const updateMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  function handleToggle(todo: Todo) {
    updateMutation.mutate({
      id: todo.id,
      completed: !todo.completed,
    });
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.body
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (filter === "active") return matchesSearch && !todo.completed;
    if (filter === "completed") return matchesSearch && todo.completed;

    return matchesSearch;
  });

  const totalCount = todos.length;
  const completedCount = completedTodos.length;

  const completionPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Box
      bg="bg.canvas"
      minH="100vh"
      py={8}
      transition="background-color .2s ease"
    >
      <PageContainer>
        <Header />

        {/* Dashboard Summary */}
        {!isPending && totalCount > 0 && (
          <Box
            p={6}
            mb={8}
            borderRadius="2xl"
            bgGradient="linear(to-r, #7c3aed, #4f46e5)"
            color="fg"
            shadow="xl"
            transition="all .2s"
          >
            <Stack gap={5}>
              <Box>
                <HStack gap={3}>
                  <Image
                    src="/favicon.png"
                    alt="Dashboard"
                    boxSize="8"
                    objectFit="contain"
                  />

                  <Heading fontSize="2xl" fontWeight="bold" color="fg">
                    Task Dashboard
                  </Heading>
                </HStack>

                <Text mt={2} opacity={0.9} color="fg">
                  {completedCount === totalCount
                    ? "🎉 Outstanding! All tasks completed!"
                    : `Keep making progress! Completed ${completedCount} of ${totalCount} tasks.`}
                </Text>
              </Box>

              <Box>
                <Flex justify="space-between" mb={2}>
                  <Text
                    fontSize="sm"
                    fontWeight="bold"
                    color="fg"
                    opacity={0.9}
                  >
                    COMPLETION RATE
                  </Text>

                  <Text fontWeight="bold" color="fg">
                    {Math.round(completionPercentage)}%
                  </Text>
                </Flex>

                <Box
                  h="10px"
                  bg="fgAlpha.300"
                  borderRadius="full"
                  overflow="hidden"
                >
                  <Box
                    h="100%"
                    bg="fg"
                    borderRadius="full"
                    width={`${completionPercentage}%`}
                    transition="width .4s ease"
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        )}

        <SectionHeader />

        {isPending && <Loading />}

        {error && <Error message={error.message} />}

        {!isPending && totalCount === 0 && <EmptyState />}

        {!isPending && totalCount > 0 && (
          <Box mt={6}>
            {/* Toolbar */}
            <Box
              bg="bg.surface"
              borderWidth="1px"
              borderColor="border"
              borderRadius="2xl"
              p={5}
              mb={8}
              transition="background-color .2s, border-color .2s"
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                gap={4}
                align="center"
                justify="space-between"
              >
                <Box flex="1" w="100%">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                </Box>

                <HStack
                  gap={2}
                  w={{ base: "100%", md: "auto" }}
                  justify={{
                    base: "stretch",
                    md: "flex-end",
                  }}
                >
                  <Button
                    variant={filter === "all" ? "solid" : "outline"}
                    colorPalette="violet"
                    onClick={() => setFilter("all")}
                    flex={{
                      base: 1,
                      md: "initial",
                    }}
                    borderRadius="xl"
                  >
                    All ({totalCount})
                  </Button>

                  <Button
                    variant={filter === "active" ? "solid" : "outline"}
                    colorPalette="violet"
                    onClick={() => setFilter("active")}
                    flex={{
                      base: 1,
                      md: "initial",
                    }}
                    borderRadius="xl"
                  >
                    Active ({activeTodos.length})
                  </Button>

                  <Button
                    variant={filter === "completed" ? "solid" : "outline"}
                    colorPalette="violet"
                    onClick={() => setFilter("completed")}
                    flex={{
                      base: 1,
                      md: "initial",
                    }}
                    borderRadius="xl"
                  >
                    Completed ({completedCount})
                  </Button>
                </HStack>
              </Stack>
            </Box>

            {filteredTodos.length === 0 ? (
              <Center py={16} flexDirection="column" gap={4}>
                <Icon as={FiSearch} boxSize={12} color="fg.subtle" />

                <Text fontSize="xl" fontWeight="bold" color="fg">
                  No tasks match your filters
                </Text>

                <Text color="fg.muted" textAlign="center" maxW="420px">
                  Try searching for something else or clear the active filters.
                </Text>

                <Button
                  variant="ghost"
                  colorPalette="violet"
                  onClick={() => {
                    setSearchQuery("");
                    setFilter("all");
                  }}
                  borderRadius="xl"
                >
                  Clear Filters
                </Button>
              </Center>
            ) : (
              <TodoList
                todos={filteredTodos}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            )}
          </Box>
        )}
      </PageContainer>
    </Box>
  );
}
