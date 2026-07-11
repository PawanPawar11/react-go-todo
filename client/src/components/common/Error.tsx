import { Center, Text } from "@chakra-ui/react";

type Props = {
  message: string;
};

export default function Error({ message }: Props) {
  return (
    <Center py={16}>
      <Text color="red.500">{message}</Text>
    </Center>
  );
}
