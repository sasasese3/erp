import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useTLToast from "../hooks/useTLToast";
import { getLocaltime } from "../utils/getlocaltime";
import { AP3Payload } from "../utils/responseType";

function AP3Page() {
  const { auth } = useAuth();
  const [ap3HeaderPayload, setAP3HeaderPayload] = useState<AP3Payload>({
    createdAt: getLocaltime().toISOString().split("T")[0],
    customerName: "",
    id: "",
    type: "VAT",
    price: 0,
    tax: 0,
    priceWithTax: 0,
  });

  const toast = useTLToast();
  const navigate = useNavigate();

  const taxType = {
    VAT: 7,
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    ap3HeaderPayload[event.target.id as keyof typeof ap3HeaderPayload] =
      event.target.value;
    setAP3HeaderPayload({ ...ap3HeaderPayload });
  };

  const handleChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(parseFloat(event.target.value).toFixed(2)) || 0;

    ap3HeaderPayload.price = value;
    ap3HeaderPayload.tax = parseFloat(
      (
        value *
        (taxType[ap3HeaderPayload.type as keyof typeof taxType] / 100)
      ).toFixed(2)
    );
    ap3HeaderPayload.priceWithTax = parseFloat(
      (
        value *
        (1 + taxType[ap3HeaderPayload.type as keyof typeof taxType] / 100)
      ).toFixed(2)
    );

    setAP3HeaderPayload({ ...ap3HeaderPayload });
  };

  const handleFormSummit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/erp/ap3", ap3HeaderPayload);
      const { msg } = response.data;
      navigate("/history");
      toast({
        title: msg,
        status: "success",
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { msg } = error.response?.data;
        toast({
          title: msg,
          status: "error",
        });
      } else {
        toast({
          title: "Something went wrong.",
          status: "error",
        });
      }
    }
  };

  const isDisableButton = () => {
    let isEmpty = false;

    for (const key in ap3HeaderPayload) {
      if (
        ap3HeaderPayload[key as keyof typeof ap3HeaderPayload] === "" ||
        ap3HeaderPayload[key as keyof typeof ap3HeaderPayload] === 0
      ) {
        isEmpty = true;
        break;
      }
    }

    return isEmpty;
  };

  return (
    <>
      <Heading> ใบสำคัญแจ้งหนี้ AP3</Heading>
      <form onSubmit={handleFormSummit}>
        <Grid
          templateColumns={"repeat(3,1fr)"}
          my={5}
          bg="whiteAlpha.900"
          p={5}
          gap={5}
        >
          <GridItem>
            <FormControl isRequired>
              <FormLabel>วันที่จัดทำ</FormLabel>
              <Input
                id="createdAt"
                value={ap3HeaderPayload.createdAt}
                onChange={handleChangeInput}
                type="date"
                max={getLocaltime().toISOString().split("T")[0]}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>พนักงานขาย</FormLabel>
              <Input
                id="employee_id"
                value={`${auth?.firstname} ${auth?.lastname}`}
                variant="filled"
                type="text"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ประเภทภาษี</FormLabel>
              <Input
                id="type"
                value={ap3HeaderPayload.type}
                variant="filled"
                type="text"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ชื่อลูกค้า</FormLabel>
              <Input
                id="customerName"
                value={ap3HeaderPayload.customerName}
                onChange={handleChangeInput}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>เลขที่ใบสำคัญบัญชี</FormLabel>
              <Input
                id="id"
                value={ap3HeaderPayload.id}
                onChange={handleChangeInput}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colStart={1}>
            <FormControl isRequired>
              <FormLabel>จำนวนเงิน</FormLabel>
              <Input
                id="price"
                value={ap3HeaderPayload.price}
                onChange={handleChangePrice}
                type="number"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ภาษี</FormLabel>
              <Input
                id="tax"
                value={ap3HeaderPayload.tax.toLocaleString()}
                variant="filled"
                type="text"
                readOnly
              ></Input>
              <FormHelperText>
                เมื่อใส่จำนวนเงิน ภาษีจะถูกคำนวนโดยอัตโนมัติ
              </FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>หัก ณ ที่จ่าย</FormLabel>
              <Input
                id="price"
                value={ap3HeaderPayload.priceWithTax.toLocaleString()}
                variant="filled"
                type="text"
                readOnly
              ></Input>
              <FormHelperText>
                เมื่อใส่จำนวนเงิน ภาษีจะถูกคำนวนโดยอัตโนมัติ
              </FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem colStart={3}>
            <Button disabled={isDisableButton()} type="submit" width="full">
              บันทึกข้อมูล
            </Button>
          </GridItem>
        </Grid>
      </form>
    </>
  );
}

export default AP3Page;
