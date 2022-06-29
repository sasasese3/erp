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
import { POPayload, Product } from "../utils/responseType";

function POPage() {
  const { auth } = useAuth();
  const [poHeaderPayload, setPOHeaderPayload] = useState<POPayload>({
    createdAt: getLocaltime().toISOString().split("T")[0],
    SupplierId: 0,
    total_price: 0,
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

    poHeaderPayload.total_price = totalPrice;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

  const handleChangeSupplierID = (value: number) => {
    poHeaderPayload.SupplierId = value;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    poHeaderPayload.createdAt = event.target.value;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

  const handleFormSummit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...poHeaderPayload,
      products: products.map((product, idx) => ({
        ProductId: product.id,
        amount: product.amount,
        price: product.price,
        no: idx + 1,
      })),
    };
    try {
      const response = await axios.post("/erp/po", payload);
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
    if (poHeaderPayload.SupplierId === 0) {
      isEmpty = true;
    }

    for (const key in poHeaderPayload) {
      if (poHeaderPayload[key as keyof typeof poHeaderPayload] === "") {
        isEmpty = true;
        break;
      }
    }

    return isEmpty || products.length === 0;
  };

  return (
    <>
      <Heading> ใบสำคัญสั่งซื้อ PO</Heading>
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
                id="date"
                value={poHeaderPayload.createdAt}
                onChange={handleChangeDate}
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
              <FormLabel>ชื่อบัญชี</FormLabel>
              <Input
                id="account_name"
                disabled={true}
                variant="filled"
                value={auth?.username}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ชื่อผู้จัดทำ</FormLabel>
              <Input
                id="create_name"
                disabled={true}
                variant="filled"
                value={`${auth?.firstname} ${auth?.lastname}`}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>จำนวนเงินทั้งหมด</FormLabel>
              <Input
                value={poHeaderPayload.total_price.toLocaleString()}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <TableWithAddButton
            products={products}
            setProduct={setProduct}
            supplier_id={poHeaderPayload.SupplierId}
            handleChangeAmount={handleChangeAmount}
            headerPayload={poHeaderPayload}
            setHeaderPayload={setPOHeaderPayload}
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

export default POPage;
