import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
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

function PVPage() {
  const { auth } = useAuth();
  const [pvHeaderPayload, setPVHeaderPayload] = useState<RVPayload>({
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

    pvHeaderPayload.total_price = totalPrice;
    setPVHeaderPayload({ ...pvHeaderPayload });
  };

  const handleChangeSupplierID = (value: number) => {
    pvHeaderPayload.SupplierId = value;
    setPVHeaderPayload({ ...pvHeaderPayload });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    pvHeaderPayload[event.target.id as keyof typeof pvHeaderPayload] =
      event.target.value;
    setPVHeaderPayload({ ...pvHeaderPayload });
  };

  const handleFormSummit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...pvHeaderPayload,
      products: products.map((product, idx) => ({
        ProductId: product.id,
        amount: product.amount,
        price: product.price,
        no: idx + 1,
      })),
    };
    try {
      const response = await axios.post("/erp/pv", payload);
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
    if (pvHeaderPayload.SupplierId === 0) {
      isEmpty = true;
    }

    for (const key in pvHeaderPayload) {
      if (key === "detail") {
        continue;
      }
      if (pvHeaderPayload[key as keyof typeof pvHeaderPayload] === "") {
        isEmpty = true;
        break;
      }
    }

    return isEmpty || products.length === 0;
  };

  return (
    <>
      <Heading> ใบสำคัญสั่งจ่าย PV</Heading>
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
                value={pvHeaderPayload.createdAt}
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
                value={auth?.id}
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
                value={pvHeaderPayload.customerName}
                onChange={handleChangeInput}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>เลขที่ใบสั่งจ่าย PV</FormLabel>
              <Input
                id="id"
                value={pvHeaderPayload.id}
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
                value={pvHeaderPayload.detail}
                onChange={handleChangeInput}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colStart={3}>
            <FormControl isRequired>
              <FormLabel>จำนวนเงินทั้งหมด</FormLabel>
              <Input
                value={pvHeaderPayload.total_price.toLocaleString()}
                variant="filled"
                type="text"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <TableWithAddButton
            products={products}
            setProduct={setProduct}
            supplier_id={pvHeaderPayload.SupplierId as number}
            handleChangeAmount={handleChangeAmount}
            headerPayload={pvHeaderPayload}
            setHeaderPayload={setPVHeaderPayload}
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

export default PVPage;
