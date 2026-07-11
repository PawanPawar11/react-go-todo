import { Card, Checkbox, HStack, IconButton, Text } from "@chakra-ui/react";
import { FiTrash2 } from "react-icons/fi";
import type { Todo } from "../../types/todo";
import EditTodoDialog from "./EditTodoDialog";

type Props = {
  todo: Todo;
  onToggle: (todo: Todo) => void;
  onDelete: (id: string) => void;
};

export default function TodoCard({ todo, onToggle, onDelete }: Props) {
  return (
    <Card.Root
      p={5}
      mb={4}
      borderRadius="2xl"
      transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      cursor="pointer"
      borderWidth="1px"
      borderColor={todo.completed ? "border.muted" : "border.subtle"}
      borderStartWidth={todo.completed ? "1px" : "4px"}
      borderStartColor={todo.completed ? "border.muted" : "violet.500"}
      bg="bg.panel"
      shadow="sm"
      opacity={todo.completed ? 0.75 : 1}
      _hover={{
        transform: "translateY(-3px)",
        shadow: "md",
        borderColor: todo.completed ? "border.muted" : "violet.300",
      }}
    >
      <HStack justify="space-between" width="100%">
        <HStack gap={4} flex="1">
          <Checkbox.Root
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo)}
            colorPalette="violet"
            size="lg"
            cursor="pointer"
          >
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>

          <Text
            fontSize="md"
            fontWeight="medium"
            textDecoration={todo.completed ? "line-through" : "none"}
            color={todo.completed ? "fg.muted" : "fg"}
            transition="color 0.2s"
            onClick={() => onToggle(todo)}
            userSelect="none"
            flex="1"
          >
            {todo.body}
          </Text>
        </HStack>

        <HStack gap={1}>
          <EditTodoDialog todo={todo} />

          <IconButton
            aria-label="Delete Todo"
            variant="ghost"
            colorPalette="red"
            onClick={() => onDelete(todo.id)}
            borderRadius="xl"
            _hover={{ bg: "red.50", color: "red.600", _dark: { bg: "red.950/30", color: "red.400" } }}
          >
            <FiTrash2 />
          </IconButton>
        </HStack>
      </HStack>
    </Card.Root>
  );
}
