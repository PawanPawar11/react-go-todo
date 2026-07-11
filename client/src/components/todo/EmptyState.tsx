import { Center, Text, VStack } from "@chakra-ui/react";
import { FiInbox } from "react-icons/fi";

export default function EmptyState() {
  return (
    <Center py={16}>
      <VStack>
        <FiInbox size={48} />

        <Text fontWeight="bold" fontSize="lg">
          No todos yet
        </Text>

        <Text color="gray.500">Create your first task.</Text>
      </VStack>
    </Center>
  );
}
