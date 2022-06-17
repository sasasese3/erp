import { Container } from "@chakra-ui/react";

function LayoutWithNav({ children }: { children: JSX.Element }) {
  return (
    <Container maxW={"container.lg"} minH="calc(100vh - 60px)" py={8}>
      {children}
    </Container>
  );
}

export default LayoutWithNav;
