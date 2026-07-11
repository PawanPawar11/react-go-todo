import { Center, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center py={16}>
      <Spinner size="xl" color="green.500" />
    </Center>
  );
}
