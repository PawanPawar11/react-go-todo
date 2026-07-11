import { Box, Heading, Text } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box
      bgGradient="linear(to-r, green.900, green.700)"
      color="white"
      borderRadius="2xl"
      py={{
        base: 14,
        md: 24,
      }}
      textAlign="center"
      mb={10}
      boxShadow="lg"
    >
      <Heading
        fontSize={{
          base: "4xl",
          md: "6xl",
        }}
        fontWeight="bold"
      >
        Todo App
      </Heading>

      <Text
        mt={4}
        fontSize={{
          base: "md",
          md: "lg",
        }}
        opacity={0.85}
      >
        Organize your day efficiently.
      </Text>
    </Box>
  );
}
