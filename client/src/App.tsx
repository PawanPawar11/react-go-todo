import { Button, Heading, VStack } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";

function App() {
  return (
    <VStack p={10}>
      <Heading>Hello Chakra UI</Heading>
      <FaGithub />
      <Button colorPalette="blue">Click Me</Button>
    </VStack>
  );
}

export default App;
