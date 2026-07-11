import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTodoSchema, type CreateTodoForm } from "../../validations/todo";
import { useUpdateTodo } from "../../hooks/useUpdateTodo";
import { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import type { Todo } from "../../types/todo";

type Props = {
  todo: Todo;
};

export default function EditTodoDialog({ todo }: Props) {
  const mutation = useUpdateTodo();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoForm>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      body: todo.body,
    },
  });

  useEffect(() => {
    reset({ body: todo.body });
  }, [todo.body, reset]);

  const onSubmit = (values: CreateTodoForm) => {
    mutation.mutate(
      {
        id: todo.id,
        body: values.body,
      },
      {
        onSuccess() {
          setOpen(false);
        },
      }
    );
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <IconButton
          aria-label="Edit Todo"
          variant="ghost"
          borderRadius="xl"
          _hover={{
            bg: "violet.50",
            color: "violet.600",
            _dark: { bg: "violet.950/30", color: "violet.400" },
          }}
        >
          <FiEdit2 />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" overflow="hidden">
            <Dialog.Header bg="bg.panel" borderBottomWidth="1px" borderColor="border.muted">
              <Dialog.Title fontSize="xl" fontWeight="bold">Edit Task</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body py={6}>
              <form id={`edit-todo-form-${todo.id}`} onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={5}>
                  <Field.Root invalid={!!errors.body}>
                    <Field.Label fontWeight="semibold">Task Description</Field.Label>

                    <Input
                      placeholder="Rename task..."
                      size="lg"
                      borderRadius="xl"
                      {...register("body")}
                    />

                    <Field.ErrorText>{errors.body?.message}</Field.ErrorText>
                  </Field.Root>
                </Stack>
              </form>
            </Dialog.Body>

            <Dialog.Footer bg="bg.panel" borderTopWidth="1px" borderColor="border.muted">
              <Button variant="ghost" onClick={() => setOpen(false)} borderRadius="xl">
                Cancel
              </Button>

              <Button
                colorPalette="violet"
                type="submit"
                form={`edit-todo-form-${todo.id}`}
                loading={mutation.isPending}
                borderRadius="xl"
              >
                Save Changes
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton borderRadius="full" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
