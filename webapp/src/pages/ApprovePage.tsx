import {
  AspectRatio,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTLToast from "../hooks/useTLToast";
import { BasePathByRole } from "../utils/roles";

type locationStateType = {
  id?: number;
  type?: string;
};
function ApprovePage() {
  const [value, setValue] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as locationStateType;
  const { id, type } = state;
  const toast = useTLToast();

  const handleClickBack = () => {
    navigate("/history", { state: { type: type } });
  };

  const handleClickSave = async () => {
    try {
      const payload = {
        approved: value === "approved",
      };
      const response = await axios.patch(`/inspector/${type}/${id}`, payload);
      const { msg } = response.data;
      toast({
        title: msg,
        status: "success",
      });
      navigate("/history", { state: { type: type } });
    } catch (error) {
      toast({
        title: "Something went wrong.",
        status: "error",
      });
    }
  };

  if (!state) {
    return (
      <Navigate
        to={
          BasePathByRole[auth?.role as keyof typeof BasePathByRole].from
            .pathname
        }
      ></Navigate>
    );
  }
  return (
    <>
      <Heading>ประเมินใบสำคัญ</Heading>
      <Grid mt={5} gridGap={3}>
        <GridItem>
          <Center>
            <AspectRatio width={"66%"}>
              <iframe
                src={`http://localhost:3333/erp/${type}/pdf/${id}`}
              ></iframe>
            </AspectRatio>
          </Center>
        </GridItem>
        <GridItem
          m="auto"
          p={5}
          bg="whiteAlpha.900"
          borderRadius={"md"}
          width="66%"
        >
          <RadioGroup onChange={setValue} value={value}>
            <Flex justify={"space-evenly"}>
              <Radio size="lg" value="rejected" colorScheme="red">
                ไม่อนุมัติ
              </Radio>
              <Radio size="lg" value="approved">
                อนุมัติ
              </Radio>
            </Flex>
            <Flex mt={2} justify="space-evenly">
              <Button onClick={handleClickBack} width="20%">
                ย้อนกลับ
              </Button>
              <Button
                onClick={handleClickSave}
                disabled={value === ""}
                width="20%"
              >
                บันทึก
              </Button>
            </Flex>
          </RadioGroup>
        </GridItem>
      </Grid>
    </>
  );
}

export default ApprovePage;
