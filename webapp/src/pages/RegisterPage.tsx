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
  UseToastOptions,
  VStack,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";

const toastProps: UseToastOptions = {
  status: "error",
};
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import LinkwithReact from "../components/LinkwithReact";
import useTLToast from "../hooks/useTLToast";
import { getLocaltime } from "../utils/getlocaltime";
import { RegisterPayload } from "../utils/responseType";

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

  const toast = useTLToast();
  const navigate = useNavigate();
  const handleSummit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/employee/register", registerPayload);
      const { msg } = response.data;
      toast({
        title: msg,
        status: "success",
      });
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        const { msg } = error.response?.data;
        if (error.response?.status === 409) {
          const { value } = error.response?.data;
          toast({
            title: msg,
            description: `value : ${value}`,
            ...toastProps,
          });
        } else if (error.response?.status === 422) {
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
        <Heading color="twitter.400"> ?????????????????????????????????</Heading>
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
                <FormLabel htmlFor="username">?????????????????????????????? / Username</FormLabel>
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
                <FormLabel htmlFor="password"> ???????????????????????? / Password </FormLabel>
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
                <FormLabel htmlFor="firstname">????????????????????????</FormLabel>
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
                <FormLabel htmlFor="lastname">?????????????????????</FormLabel>
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
                <FormLabel htmlFor="email"> ??????????????? </FormLabel>
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
                <FormLabel htmlFor="id"> ????????????????????????????????? </FormLabel>
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
                <FormLabel htmlFor="phone_no">??????????????????????????????????????????</FormLabel>
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
                <FormLabel htmlFor="ssn">??????????????????????????????????????????????????????</FormLabel>
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
                <FormLabel htmlFor="birthdate">?????????/???????????????/??????????????????</FormLabel>
                <Input
                  value={registerPayload.birthdate}
                  onChange={handleFormChange}
                  id="birthdate"
                  type="date"
                  max={getLocaltime().toISOString().split("T")[0]}
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="address">?????????????????????</FormLabel>
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
                <FormLabel htmlFor="department">????????????</FormLabel>
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
                <FormLabel htmlFor="position">?????????????????????</FormLabel>
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
                ???????????????????????????????????????????????????????????????????????? ???????????????????????????????????????????????????????????? ?????????
                ???????????????????????????????????????????????????????????????
              </Checkbox>
            </GridItem>
            <GridItem>
              <LinkwithReact to="/login">
                <Button width="full" colorScheme={"red"}>
                  ????????????????????????
                </Button>
              </LinkwithReact>
            </GridItem>
            <GridItem colSpan={1}>
              <Button disabled={isDisableButton()} type="submit" width="full">
                {" "}
                ?????????????????????????????????
              </Button>
            </GridItem>
          </Grid>
        </form>
      </VStack>
    </Flex>
  );
}

export default RegisterPage;
