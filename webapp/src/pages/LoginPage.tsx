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
  useToast,
  UseToastOptions,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FaUserAlt, FaLock } from "react-icons/fa";
import axios, { AxiosError } from "axios";
import useAuth from "../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { BasePathByRole } from "../utils/roles";
import { UserResponse } from "../utils/responseType";
import { Link as ReactLink } from "react-router-dom";

type LoginPayload = {
  username: string;
  password: string;
};

type LocationState = {
  from: {
    pathname: string;
  };
};

const toastProps: UseToastOptions = {
  status: "error",
  duration: 2000,
  position: "top-right",
};

function LoginPage() {
  //for left icon in input
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);

  //for auth
  const { setAuth } = useAuth();

  //for navigation
  const navigate = useNavigate();
  const location = useLocation();

  //for login request
  const [loginPayload, setLoginPayload] = useState<LoginPayload>({
    username: "",
    password: "",
  });

  //for login failed alert
  const toast = useToast();

  //for focus on email input
  const userRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    userRef.current!.focus();
  }, []);

  const handleSummit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const response = await axios.post<UserResponse>(
        "/auth/login",
        loginPayload
      );
      const { data } = response.data;
      setAuth?.({ ...data });
      const { from } =
        (location.state as LocationState) ||
        BasePathByRole[data.role as keyof typeof BasePathByRole];
      navigate(from, { replace: true });
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 401) {
          toast({
            title: "Email or Password is incorrect.",
            ...toastProps,
          });
        } else {
          toast({
            title: "Something went wrong.",
            ...toastProps,
          });
        }
      } else {
        toast({
          title: "Something went wrong.",
          ...toastProps,
        });
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    loginPayload[event.target.id as keyof typeof loginPayload] =
      event.target.value;
    setLoginPayload({ ...loginPayload });
  };

  return (
    <Flex
      direction="column"
      width="100wh"
      height="100vh"
      justify="center"
      align="center"
    >
      <VStack spacing={4}>
        <Avatar background="twitter.400"></Avatar>
        <Heading color="twitter.400">ERP System</Heading>
        <Box minW={{ base: "90%", md: "468px" }} borderRadius="md">
          <form onSubmit={handleSummit}>
            <VStack
              spacing={4}
              background="whiteAlpha.900"
              p={4}
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
                    id="username"
                    type="text"
                    ref={userRef}
                    placeholder="Username"
                    value={loginPayload.username}
                    onChange={handleChange}
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
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={loginPayload.password}
                    onChange={handleChange}
                  ></Input>
                </InputGroup>
              </FormControl>
              <FormControl>
                <Button
                  disabled={!(loginPayload.username && loginPayload.password)}
                  type="submit"
                  variant="solid"
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
          <Link as={ReactLink} color={"teal.500"} to="/register">
            Sign Up
          </Link>
        </Box>
      </VStack>
    </Flex>
  );
}

export default LoginPage;
