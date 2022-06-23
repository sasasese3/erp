import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import POTableWithAddButton from "../components/POTableWithAddButton";
import CustomSelectSearch from "../components/SelectSearch";
import useAuth from "../hooks/useAuth";
import { getLocaltime } from "../utils/getlocaltime";
import { POPayload, Product } from "../utils/responseType";

function POPage() {
  const { auth } = useAuth();
  const [poHeaderPayload, setPOHeaderPayload] = useState<POPayload>({
    date: getLocaltime().toISOString().split("T")[0],
    create_name: `${auth?.firstname!} ${auth?.lastname!}`,
    employee_id: `${auth?.id!}`,
    account_name: auth?.username!,
    supplier_id: 0,
    total_price: 0,
  });

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
    poHeaderPayload.supplier_id = value;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

  const handleChangeDate = (event: ChangeEvent<HTMLInputElement>) => {
    poHeaderPayload.date = event.target.value;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

  const handleFormSummit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(poHeaderPayload);
    console.log(products);
  };

  const isDisableButton = () => {
    let isEmpty = false;
    if (poHeaderPayload.supplier_id === 0) {
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
                value={poHeaderPayload.date}
                onChange={handleChangeDate}
                type="date"
                max={getLocaltime().toISOString().split("T")[0]}
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
                value={poHeaderPayload.create_name}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>รหัสพนักงานขาย</FormLabel>
              <Input
                id="employee_id"
                disabled={true}
                value={poHeaderPayload.employee_id}
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
                value={poHeaderPayload.account_name}
                type="text"
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
              <FormLabel>จำนวนเงินทั้งหมด</FormLabel>
              <Input
                value={poHeaderPayload.total_price.toLocaleString()}
                disabled={true}
                type="text"
                variant="filled"
              ></Input>
            </FormControl>
          </GridItem>
          <POTableWithAddButton
            products={products}
            setProduct={setProduct}
            supplier_id={poHeaderPayload.supplier_id}
            handleChangeAmount={handleChangeAmount}
            poHeaderPayload={poHeaderPayload}
            setPOHeaderPayload={setPOHeaderPayload}
          ></POTableWithAddButton>
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
