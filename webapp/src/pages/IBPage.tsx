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
import { IBPayload, Product } from "../utils/responseType";

function IBPage() {
  const { auth } = useAuth();
  const [ibHeaderPayload, setIBHeaderPayload] = useState<IBPayload>({
    createdAt: getLocaltime().toISOString().split("T")[0],
    SupplierId: 0,
    total_price: 0,
    companyName: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    id: "",
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

    ibHeaderPayload.total_price = totalPrice;
    setIBHeaderPayload({ ...ibHeaderPayload });
  };

  const handleChangeSupplierID = (value: number) => {
    ibHeaderPayload.SupplierId = value;
    setIBHeaderPayload({ ...ibHeaderPayload });
  };

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    ibHeaderPayload[event.target.id as keyof typeof ibHeaderPayload] =
      event.target.value;
    setIBHeaderPayload({ ...ibHeaderPayload });
  };

  const handleFormSummit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      ...ibHeaderPayload,
      products: products.map((product, idx) => ({
        ProductId: product.id,
        amount: product.amount,
        price: product.price,
        no: idx + 1,
      })),
    };
    try {
      // const response = await axios.post("/erp/ib", payload);
      // const { msg } = response.data;
      // navigate("/history");
      // toast({
      //   title: msg,
      //   status: "success",
      // });
      console.log(JSON.stringify(payload));
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
    if (ibHeaderPayload.SupplierId === 0) {
      isEmpty = true;
    }

    for (const key in ibHeaderPayload) {
      if (key === "detail") {
        continue;
      }
      if (ibHeaderPayload[key as keyof typeof ibHeaderPayload] === "") {
        isEmpty = true;
        break;
      }
    }

    return isEmpty || products.length === 0;
  };

  return (
    <>
      <Heading> ใบสำคัญรับสินค้า IB</Heading>
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
                value={ibHeaderPayload.createdAt}
                onChange={handleChangeInput}
                type="date"
                max={getLocaltime().toISOString().split("T")[0]}
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <CustomSelectSearch
              change={true}
              handleChangeSupplierID={handleChangeSupplierID}
              setProduct={setProduct}
            ></CustomSelectSearch>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ชื่อพนักงาน</FormLabel>
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
              <FormLabel>เลขที่ใบรับสินค้า IB</FormLabel>
              <Input
                id="id"
                value={ibHeaderPayload.id}
                onChange={handleChangeInput}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>สถานที่รับสินค้า</FormLabel>
              <Input
                id="companyName"
                value={ibHeaderPayload.companyName}
                variant="filled"
                type="text"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>จำนวนเงินทั้งหมด</FormLabel>
              <Input
                value={ibHeaderPayload.total_price.toLocaleString()}
                variant="filled"
                type="text"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <TableWithAddButton
            products={products}
            setProduct={setProduct}
            supplier_id={ibHeaderPayload.SupplierId as number}
            handleChangeAmount={handleChangeAmount}
            headerPayload={ibHeaderPayload}
            setHeaderPayload={setIBHeaderPayload}
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

export default IBPage;
