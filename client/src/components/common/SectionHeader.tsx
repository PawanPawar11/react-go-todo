import { Box, Heading, HStack, Text } from "@chakra-ui/react";

import CreateTodoDialog from "../todo/CreateTodoDialog";

export default function SectionHeader() {
  return (
    <HStack justify="space-between" align="center" mb={6}>
      <Box>
        <Heading size="xl">My Tasks</Heading>

        <Text color="fg.muted">Organize your work efficiently</Text>
      </Box>

      <CreateTodoDialog />
    </HStack>
  );
}
