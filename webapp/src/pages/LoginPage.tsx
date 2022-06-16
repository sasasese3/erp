import {
  Avatar,
  Box,
  Button,
  chakra,
  Flex,
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios, { AxiosError } from "axios";

type LoginPayload = {
  email: string;
  password: string;
};

function LoginPage() {
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);

  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    email: "",
    password: "",
  });

  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userRef.current!.focus();
  }, []);

  const handleSummit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await axios.post("/auth/login", loginPayload);
      console.log(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.message);
      } else {
        console.log(error);
      }
    }
  };

  const handleChange = (name: string, value: string) => {
    const { email, password } = loginPayload;
    switch (name) {
      case "email":
        const newEmail = value;
        setLoginPayload({ email: newEmail, password });
        break;
      case "password":
        const newPassword = value;
        setLoginPayload({ email, password: newPassword });
        break;
    }
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
        <Avatar background="telegram.400"></Avatar>
        <Heading color="telegram.400">ERP System</Heading>
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
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaUserAlt color="gray.300" />}
                  />

                  <Input
                    type="email"
                    ref={userRef}
                    placeholder="Email address"
                    value={loginPayload.email}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChange("email", event.target.value)
                    }
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<CFaLock color="gray.300" />}
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={loginPayload.password}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleChange("password", event.target.value)
                    }
                  ></Input>
                </InputGroup>
              </FormControl>
              <FormControl>
                <Button
                  disabled={!(loginPayload.email && loginPayload.password)}
                  type="submit"
                  variant="solid"
                  colorScheme="telegram"
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
