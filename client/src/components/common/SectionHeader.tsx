import { Flex, Heading } from "@chakra-ui/react";

import type { PropsWithChildren } from "react";

export default function SectionHeader({ children }: PropsWithChildren) {
  return (
    <Flex justify="space-between" align="center" mb={6}>
      <Heading size="xl">{children}</Heading>
    </Flex>
  );
}
