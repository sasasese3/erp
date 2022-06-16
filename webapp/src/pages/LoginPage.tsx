import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";

function LoginPage() {
  const handleSummit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Hello World");
  };
  return (
    <Flex
      direction="column"
      width="100wh"
      height="100vh"
      justify="center"
      background="gray.200"
      align="center"
    >
      <VStack spacing={4}>
        <Avatar background="teal.400"></Avatar>
        <Heading color="teal.400">ERP System</Heading>
        <Box minW={{ base: "90%", md: "468px" }} borderRadius="md">
          <form onSubmit={handleSummit}>
            <VStack
              spacing={4}
              background="whiteAlpha.900"
              p={"1rem"}
              boxShadow="md"
              borderRadius="md"
            >
              <FormControl>
                <Input type="email" placeholder="Email address"></Input>
              </FormControl>
              <FormControl>
                <Input type="password" placeholder="Password"></Input>
              </FormControl>
              <FormControl>
                <Button
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
              </FormControl>
            </VStack>
          </form>
        </Box>
        <Box>
          New to us?{" "}
          <Link color={"teal.500"} href="/register">
            Sign Up
          </Link>
        </Box>
      </VStack>
    </Flex>
  );
}

export default LoginPage;
