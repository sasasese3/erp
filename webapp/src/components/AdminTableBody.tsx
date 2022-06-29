import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Td,
  Text,
  Tr,
  useDisclosure,
  UseToastOptions,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import useTLToast from "../hooks/useTLToast";
import { RevertRoles } from "../utils/roles";

type AdminTableBodyProps = {
  setUpdate: Function;
  id?: number;
  email?: string;
  username?: string;
  firstname?: string;
  lastname?: string;
  role?: string;
  verified?: boolean;
};

const toastProps: UseToastOptions = {
  status: "error",
};
function AdminTableBody({
  id,
  email,
  username,
  firstname,
  lastname,
  role,
  verified,
  setUpdate,
}: AdminTableBodyProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRole, setSelectedRole] = useState("");
  const toast = useTLToast();
  const handleChangeRole = async () => {
    try {
      const response = await axios.patch("/admin/employee", {
        id,
        role: selectedRole,
      });
      const { msg } = response.data;
      toast({
        title: msg,
        status: "success",
      });
      onClose();
      setUpdate(true);
      setSelectedRole("");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status == 422) {
          toast({
            title: "Please select role.",
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
  return (
    <>
      <Tr>
        <Td> {id} </Td>
        <Td> {email} </Td>
        <Td> {username} </Td>
        <Td> {firstname} </Td>
        <Td> {lastname} </Td>
        <Td>{RevertRoles[role as keyof typeof RevertRoles]}</Td>
        <Td> {verified ? "ยืนยัน" : "ไม่ยืนยัน"} </Td>
        <Td>
          <Button onClick={onOpen} width={"full"}>
            คลิก
          </Button>
        </Td>
        <Td display="none">
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>เปลี่ยนหน้าที่พนักงาน</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  {email} หน้าที่{" "}
                  {RevertRoles[role as keyof typeof RevertRoles]}
                </Text>
                <Select
                  value={selectedRole}
                  onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                    setSelectedRole(event.target.value)
                  }
                  placeholder="เลือกหน้าที่ใหม่ที่ต้องการ"
                  mt={4}
                >
                  <option value="444"> EMPLOYEE</option>
                  <option value="666"> INSPECTOR</option>
                  <option value="777"> ADMIN</option>
                </Select>
              </ModalBody>
              <ModalFooter gap={2}>
                <Button disabled={!selectedRole} onClick={handleChangeRole}>
                  เปลี่ยน
                </Button>
                <Button onClick={onClose} colorScheme="red">
                  ปิด
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Td>
      </Tr>
    </>
  );
}

export default AdminTableBody;
