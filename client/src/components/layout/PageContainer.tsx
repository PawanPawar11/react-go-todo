import { Box } from "@chakra-ui/react";
import type { PropsWithChildren } from "react";

export default function PageContainer({ children }: PropsWithChildren) {
  return (
    <Box
      maxW="1100px"
      mx="auto"
      px={{
        base: 4,
        md: 8,
      }}
    >
      {children}
    </Box>
  );
}
