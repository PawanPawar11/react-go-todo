import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Stack,
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { createTodoSchema, type CreateTodoForm } from "../../validations/todo";

import { useCreateTodo } from "../../hooks/useCreateTodo";
import { useState } from "react";

export default function CreateTodoDialog() {
  const mutation = useCreateTodo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTodoForm>({
    resolver: zodResolver(createTodoSchema),
  });

  const onSubmit = (values: CreateTodoForm) => {
    mutation.mutate(values.body, {
      onSuccess() {
        reset();
        setOpen(false);
      },
    });
  };

  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button colorPalette="green">Add Task</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create Todo</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <form id="create-todo-form" onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={5}>
                  <Field.Root invalid={!!errors.body}>
                    <Field.Label>Task</Field.Label>

                    <Input placeholder="Learn Fiber" {...register("body")} />

                    <Field.ErrorText>{errors.body?.message}</Field.ErrorText>
                  </Field.Root>
                </Stack>
              </form>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="ghost">Cancel</Button>

              <Button
                colorPalette="green"
                type="submit"
                form="create-todo-form"
                loading={mutation.isPending}
              >
                Create
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
