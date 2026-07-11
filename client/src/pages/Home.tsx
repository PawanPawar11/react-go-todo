import { Box } from "@chakra-ui/react";

import Header from "../components/layout/Header";
import PageContainer from "../components/layout/PageContainer";
import SectionHeader from "../components/common/SectionHeader";

export default function Home() {
  return (
    <Box bg="gray.50" minH="100vh" py={8}>
      <PageContainer>
        <Header />

        <SectionHeader>Tasks</SectionHeader>
      </PageContainer>
    </Box>
  );
}
