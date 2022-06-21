import { Flex, Image, Text } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { BasePathByRole } from "../utils/roles";
import LinkwithReact from "./LinkwithReact";

function LogowithText() {
  const { auth } = useAuth();
  console.log(auth);
  return (
    <LinkwithReact
      to={
        BasePathByRole[auth?.role as keyof typeof BasePathByRole].from.pathname
      }
    >
      <Flex align="center">
        <Image src="/src/logo.svg" height={"60px"}></Image>
        <Text color={"whiteAlpha.800"} fontWeight={"bold"}>
          ERP System
        </Text>
      </Flex>
    </LinkwithReact>
  );
}

export default LogowithText;
