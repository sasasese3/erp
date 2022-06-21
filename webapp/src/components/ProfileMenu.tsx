import {
  Button,
  chakra,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import {
  FaChevronDown,
  FaChevronUp,
  FaHistory,
  FaSignOutAlt,
  FaUserEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../utils/roles";

function ProfileMenu() {
  //for icon in top-right menu
  const CFaChevronDown = chakra(FaChevronDown);
  const CFAChevronUp = chakra(FaChevronUp);

  const CFaHistory = chakra(FaHistory);
  const CFaUserEdit = chakra(FaUserEdit);
  const CFaSignOutAlt = chakra(FaSignOutAlt);

  //for hover open & close top-right menu
  const { isOpen, onOpen, onClose } = useDisclosure();

  //for show fullname in top-right menu
  const { auth, setAuth } = useAuth();

  //for navigate to other page
  const navigate = useNavigate();

  //for letting user know when have error request
  const toast = useToast();

  const handleClickAccount = () => {
    navigate("/account");
  };

  const handleClickHistory = () => {
    navigate("/history");
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
        height="full"
      >
        คุณ {`${auth?.firstname} ${auth?.lastname}`} รหัส : {`${auth?.id}`}
      </MenuButton>
      <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
        <MenuItem onClick={handleClickAccount}>
          <CFaUserEdit mr={5} />
          ข้อมูลบัญชี
        </MenuItem>
        {auth?.role === ROLES.EMPLOYEE ? (
          <MenuItem onClick={handleClickHistory}>
            <CFaHistory mr={5} />
            <Text>เรียกดูใบสำคัญ</Text>
          </MenuItem>
        ) : (
          <></>
        )}
        <MenuItem onClick={handleClickLogout}>
          <CFaSignOutAlt mr={5} />
          ออกจากระบบ
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default ProfileMenu;
