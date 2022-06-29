import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableWithAddButton from "../components/erp/TableWithAddButton";
import CustomSelectSearch from "../components/SelectSearch";
import useAuth from "../hooks/useAuth";
import useTLToast from "../hooks/useTLToast";
import { getLocaltime } from "../utils/getlocaltime";
import { Product, RVPayload } from "../utils/responseType";

function RVPage() {
  const { auth } = useAuth();
  const [rvHeaderPayload, setRVHeaderPayload] = useState<RVPayload>({
    createdAt: getLocaltime().toISOString().split("T")[0],
    SupplierId: 0,
    total_price: 0,
    customerName: "",
    id: "",
    detail: "",
  });

  const toast = useTLToast();
  const navigate = useNavigate();

  const [products, setProduct] = useState<Product[]>([]);

  const handleChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newProducts = [...products];

    const idx = parseInt(event.target.id);
    let value = parseInt(event.target.value) || 0;
    value = Math.min(newProducts[idx].stock, value);

    newProducts[idx].amount = value;
    newProducts[idx].price = value * newProducts[idx].per_amount;

    setProduct(newProducts);

    const totalPrice = products.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);

    rvHeaderPayload.total_price = totalPrice;
    setRVHeaderPayload({ ...rvHeaderPayload });
  };

  const handleChangeSupplierID = (value: number) => {
    rvHeaderPayload.SupplierId = value;
    setRVHeaderPayload({ ...rvHeaderPayload });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    rvHeaderPayload[event.target.id as keyof typeof rvHeaderPayload] =
      event.target.value;
    setRVHeaderPayload({ ...rvHeaderPayload });
  };

  const handleFormSummit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...rvHeaderPayload,
      products: products.map((product, idx) => ({
        ProductId: product.id,
        amount: product.amount,
        price: product.price,
        no: idx + 1,
      })),
    };
    try {
      // const response = await axios.post("/erp/rv", payload);
      // const { msg } = response.data;
      // navigate("/history");
      // toast({
      //   title: msg,
      //   status: "success",
      // });
      console.log(payload);
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
    if (rvHeaderPayload.SupplierId === 0) {
      isEmpty = true;
    }

    for (const key in rvHeaderPayload) {
      if (key === "detail") {
        continue;
      }
      if (rvHeaderPayload[key as keyof typeof rvHeaderPayload] === "") {
        isEmpty = true;
        break;
      }
    }

    return isEmpty || products.length === 0;
  };

  return (
    <>
      <Heading> ใบสำคัญรับเงิน RV</Heading>
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
                value={rvHeaderPayload.createdAt}
                onChange={handleChangeInput}
                type="date"
                max={getLocaltime().toISOString().split("T")[0]}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <CustomSelectSearch
              handleChangeSupplierID={handleChangeSupplierID}
              setProduct={setProduct}
            ></CustomSelectSearch>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>รหัสพนักงานขาย</FormLabel>
              <Input
                id="employee_id"
                disabled={true}
                value={auth?.id}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ชื่อลูกค้า</FormLabel>
              <Input
                id="customerName"
                value={rvHeaderPayload.customerName}
                onChange={handleChangeInput}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>เลขที่ใบเสร็จรับเงิน RV</FormLabel>
              <Input
                id="id"
                value={rvHeaderPayload.id}
                onChange={handleChangeInput}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel>รายละเอียด</FormLabel>
              <Input
                id="detail"
                value={rvHeaderPayload.detail}
                onChange={handleChangeInput}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>จำนวนเงินทั้งหมด</FormLabel>
              <Input
                value={rvHeaderPayload.total_price.toLocaleString()}
                disabled={true}
                type="text"
                variant="filled"
              ></Input>
            </FormControl>
          </GridItem>
          <TableWithAddButton
            products={products}
            setProduct={setProduct}
            supplier_id={rvHeaderPayload.SupplierId as number}
            handleChangeAmount={handleChangeAmount}
            headerPayload={rvHeaderPayload}
            setHeaderPayload={setRVHeaderPayload}
          ></TableWithAddButton>
          <GridItem colStart={3} colEnd={3}>
            <Button disabled={isDisableButton()} type="submit" width="full">
              บันทึกข้อมูล
            </Button>
          </GridItem>
        </Grid>
      </form>
    </>
  );
}

export default RVPage;
