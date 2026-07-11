import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "../api/todoApi";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, completed }: { id: string; completed: boolean }) =>
      updateTodo(id, completed),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todos"],
      });
    },
  });
}
