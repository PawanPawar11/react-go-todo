import { Flex, Heading } from "@chakra-ui/react";

import type { PropsWithChildren } from "react";
import CreateTodoDialog from "../todo/CreateTodoDialog";

export default function SectionHeader({ children }: PropsWithChildren) {
  return (
    <Flex justify="space-between" align="center" mb={6}>
      <Heading size="xl">{children}</Heading>
      <CreateTodoDialog />
    </Flex>
  );
}
