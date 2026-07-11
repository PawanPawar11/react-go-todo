import { Card, Checkbox, HStack, IconButton, Text } from "@chakra-ui/react";

import { FiEdit2, FiTrash2 } from "react-icons/fi";

import type { Todo } from "../../types/todo";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export default function TodoCard({ todo, onToggle, onDelete }: Props) {
  return (
    <Card.Root
      p={4}
      mb={4}
      borderRadius="xl"
      transition="0.2s"
      cursor="pointer"
      _hover={{
        transform: "translateY(-2px)",
        shadow: "md",
      }}
    >
      <HStack justify="space-between">
        <HStack gap={4}>
          <Checkbox.Root
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo)}
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>

          <Text
            textDecoration={todo.completed ? "line-through" : "none"}
            color={todo.completed ? "gray.500" : "gray.800"}
          >
            {todo.body}
          </Text>
        </HStack>

        <HStack>
          <IconButton aria-label="Edit Todo" variant="ghost">
            <FiEdit2 />
          </IconButton>

          <IconButton
            aria-label="Delete Todo"
            variant="ghost"
            colorPalette="red"
            onClick={() => onDelete(todo.id)}
          >
            <FiTrash2 />
          </IconButton>
        </HStack>
      </HStack>
    </Card.Root>
  );
}
