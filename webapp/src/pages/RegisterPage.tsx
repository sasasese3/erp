import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  useToast,
  UseToastOptions,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

type RegisterPayload = {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  id: string;
  phone_no: string;
  ssn: string;
  birthdate: string;
  address: string;
  department: string;
  position: string;
};

const toastProps: UseToastOptions = {
  status: "error",
  duration: 2000,
  position: "top-right",
};
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [checkbox, setCheckbox] = useState(false);
  const [registerPayload, setRegisterPayload] = useState<RegisterPayload>({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    id: "",
    phone_no: "",
    ssn: "",
    birthdate: "",
    address: "",
    department: "",
    position: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const handleSummit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/employee/register", registerPayload);
      const { msg } = response.data;
      toast({
        title: msg,
        status: "success",
        duration: 2000,
        position: "top-right",
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        const { msg } = error.response?.data;
        if (error.response?.status == 409 || 422) {
          toast({
            title: msg,
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

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    registerPayload[event.target.id as keyof typeof registerPayload] =
      event.target.value;
    setRegisterPayload({ ...registerPayload });
  };

  const isDisableButton = () => {
    let isEmpty = false;
    for (const key in registerPayload) {
      if (registerPayload[key as keyof typeof registerPayload] === "") {
        isEmpty = true;
        break;
      }
    }
    return isEmpty || !checkbox;
  };
  return (
    <Flex
      direction="column"
      minH="100vh"
      width="100wh"
      justify="center"
      align="center"
      padding={10}
    >
      <VStack spacing={4}>
        <Heading color="twitter.400"> สมัครสมาชิก</Heading>
        <form onSubmit={handleSummit}>
          <Grid
            background="whiteAlpha.900"
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            minW={{ base: "60%", md: "468px" }}
            gap={3}
            p={5}
            borderRadius={"md"}
          >
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="username">ชื่อผู้ใช้ / Username</FormLabel>
                <Input
                  value={registerPayload.username}
                  onChange={handleFormChange}
                  id="username"
                  type="text"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="password"> รหัสผ่าน / Password </FormLabel>
                <Input
                  value={registerPayload.password}
                  onChange={handleFormChange}
                  id="password"
                  type="password"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="firstname">ชื่อจริง</FormLabel>
                <Input
                  value={registerPayload.firstname}
                  onChange={handleFormChange}
                  id="firstname"
                  type="text"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="lastname">นามสกุล</FormLabel>
                <Input
                  value={registerPayload.lastname}
                  onChange={handleFormChange}
                  id="lastname"
                  type="text"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="email"> อีเมล </FormLabel>
                <Input
                  value={registerPayload.email}
                  onChange={handleFormChange}
                  id="email"
                  type="email"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="id"> รหัสพนักงาน </FormLabel>
                <Input
                  value={registerPayload.id}
                  onChange={handleFormChange}
                  id="id"
                  type="text"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="phone_no">เบอร์โทรติดต่อ</FormLabel>
                <Input
                  value={registerPayload.phone_no}
                  onChange={handleFormChange}
                  id="phone_no"
                  type="tel"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="ssn">เลขประจำตัวประชาชน</FormLabel>
                <Input
                  value={registerPayload.ssn}
                  onChange={handleFormChange}
                  id="ssn"
                  type="text"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="birthdate">วัน/เดือน/ปีเกิด</FormLabel>
                <Input
                  value={registerPayload.birthdate}
                  onChange={handleFormChange}
                  id="birthdate"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="address">ที่อยู่</FormLabel>
                <Input
                  value={registerPayload.address}
                  onChange={handleFormChange}
                  id="address"
                  type="text"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="department">แผนก</FormLabel>
                <Input
                  value={registerPayload.department}
                  onChange={handleFormChange}
                  id="department"
                  type="text"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="position">ตำแหน่ง</FormLabel>
                <Input
                  value={registerPayload.position}
                  onChange={handleFormChange}
                  id="position"
                  type="text"
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Checkbox
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  setCheckbox(event.target.checked);
                }}
                isChecked={checkbox}
              >
                ข้าพเจ้าเข้าใจและตกลงตาม เงื่อนไขการให้บริการ และ
                นโยบายความเป็นส่วนตัว
              </Checkbox>
            </GridItem>
            <GridItem>
              <Button
                width="full"
                colorScheme={"red"}
                onClick={() => navigate("/login")}
              >
                ย้อนกลับ
              </Button>
            </GridItem>
            <GridItem colSpan={1}>
              <Button disabled={isDisableButton()} type="submit" width="full">
                {" "}
                สมัครสมาชิก
              </Button>
            </GridItem>
          </Grid>
        </form>
      </VStack>
    </Flex>
  );
}

export default RegisterPage;
