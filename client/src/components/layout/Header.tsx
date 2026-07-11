import { Flex, Heading, HStack } from "@chakra-ui/react";
import { ColorModeButton } from "../ui/color-mode";
import { FiCheckSquare } from "react-icons/fi";

export default function Header() {
  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      py={5}
      mb={8}
      borderBottomWidth="1px"
      borderColor="border"
      transition="border-color .2s ease"
    >
      <HStack gap={3}>
        <Flex
          align="center"
          justify="center"
          boxSize="10"
          borderRadius="xl"
          bgGradient="linear(to-br, #8b5cf6, #4f46e5)"
          color="fg"
          shadow="md"
        >
          <FiCheckSquare size={20} color="fg" />
        </Flex>

        <Heading
          fontSize="2xl"
          fontWeight="bold"
          bgGradient="linear(to-r, #7c3aed, #4f46e5)"
          bgClip="text"
          color="fg"
        >
          TaskFlow
        </Heading>
      </HStack>

      <ColorModeButton
        size="md"
        variant="ghost"
        borderRadius="xl"
        _hover={{
          bg: "bg.subtle",
        }}
        transition="background-color .2s ease"
      />
    </Flex>
  );
}
