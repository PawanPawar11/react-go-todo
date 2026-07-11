import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todoApi";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      body,
      completed,
    }: {
      id: string;
      body?: string;
      completed?: boolean;
    }) => updateTodo(id, { body, completed }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}
