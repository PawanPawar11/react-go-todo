import { Button, Flex, Heading } from "@chakra-ui/react";

import { FiPlus } from "react-icons/fi";

import type { PropsWithChildren } from "react";

export default function SectionHeader({ children }: PropsWithChildren) {
  return (
    <Flex justify="space-between" align="center" mb={6}>
      <Heading size="xl">{children}</Heading>

      <Button colorPalette="green">
        <FiPlus />
        Add Task
      </Button>
    </Flex>
  );
}
