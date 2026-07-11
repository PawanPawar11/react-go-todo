import { Box, Heading, Text } from "@chakra-ui/react";

export default function Home() {
  return (
    <Box minH="100vh" bg="gray.500" px={6} py={12}>
      <Heading mb={2}>Todo App</Heading>

      <Text color="gray.800">React + Go + MongoDB</Text>
    </Box>
  );
}
