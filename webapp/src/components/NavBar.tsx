import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  Container,
  Flex,
  Grid,
  GridItem,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  position,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../utils/roles";

function NavBar() {
  //for icon in top-right menu
  const CFaChevronDown = chakra(FaChevronDown);
  const CFAChevronUp = chakra(FaChevronUp);

  //for hover open & close top-right menu
  const { isOpen, onOpen, onClose } = useDisclosure();

  //for show fullname in top-right menu
  const { auth, setAuth } = useAuth();

  //for navigate to other page
  const location = useLocation();
  const navigate = useNavigate();

  //for letting user know when have error request
  const toast = useToast();

  const handleClickAccount = () => {
    navigate("/account", { state: { from: location } });
  };

  const handleClickHistory = () => {
    navigate("/history", { state: { from: location } });
  };

  const handleClickLogout = async () => {
    try {
      const response = await axios.delete("/auth/logout");
      const { msg } = response.data;
      toast({
        title: msg,
        status: "success",
        duration: 2000,
        position: "top-right",
      });
      setAuth?.({});
    } catch (error) {
      toast({
        title: "Something went wrong.",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
    }
  };
  return (
    <>
      <Flex
        height="60px"
        bg="telegram.400"
        justify="space-between"
        align="center"
        px={20}
      >
        <Grid templateColumns="repeat(5,1fr)" width="30%">
          <GridItem bg="gray">fgfgfg</GridItem>
          <GridItem bg="black"></GridItem>
          <GridItem bg="cyan"></GridItem>
          <GridItem bg="yellow"></GridItem>
          <GridItem bg="blue"></GridItem>
        </Grid>
        <Menu isOpen={isOpen} gutter={0} isLazy={true}>
          <MenuButton
            as={Button}
            variant="unstyled"
            colorScheme="twitter"
            rightIcon={isOpen ? <CFAChevronUp /> : <CFaChevronDown />}
            textColor="whiteAlpha.800"
            _hover={{ textDecoration: "underline" }}
            _focus={{ boxShadow: "none" }}
            onMouseEnter={onOpen}
            onMouseLeave={onClose}
            height="100%"
          >
            ชื่อ : {`${auth?.firstname} ${auth?.lastname}`}
          </MenuButton>
          <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
            <MenuItem onClick={handleClickAccount}> ข้อมูลบัญชี</MenuItem>
            {auth?.role === ROLES.EMPLOYEE ? (
              <MenuItem onClick={handleClickHistory}> เรียกดูใบสำคัญ </MenuItem>
            ) : (
              <></>
            )}

            <MenuItem onClick={handleClickLogout}> ออกจากระบบ</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}

export default NavBar;
