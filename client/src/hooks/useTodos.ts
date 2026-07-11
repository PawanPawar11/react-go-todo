import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todoApi";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });
}
