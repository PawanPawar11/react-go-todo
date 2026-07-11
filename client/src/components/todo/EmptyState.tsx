import { Center, Text, VStack, Flex } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";

export default function EmptyState() {
  return (
    <Center py={24} px={4}>
      <VStack gap={4}>
        <Flex
          align="center"
          justify="center"
          boxSize="16"
          borderRadius="2xl"
          bg="violet.50"
          _dark={{ bg: "violet.950/20" }}
          color="violet.500"
          shadow="inner"
        >
          <FiCheckCircle size={32} />
        </Flex>

        <VStack gap={1} textAlign="center">
          <Text fontWeight="bold" fontSize="xl" color="fg">
            Your task list is empty
          </Text>

          <Text color="fg.muted" maxW="300px" fontSize="sm">
            Enjoy your peace of mind, or click "Add Task" above to start planning your day.
          </Text>
        </VStack>
      </VStack>
    </Center>
  );
}
