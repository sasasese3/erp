import { Flex } from "@chakra-ui/react";
import LogowithText from "./LogowithText";
import ProfileMenu from "./ProfileMenu";

function NavBar() {
  return (
    <>
      <Flex
        height="60px"
        bg="telegram.400"
        justify={"space-around"}
        align="center"
      >
        <Flex align={"center"} width="130%" justify={"space-around"}>
          <LogowithText />
          <ProfileMenu />
        </Flex>
      </Flex>
    </>
  );
}

export default NavBar;
