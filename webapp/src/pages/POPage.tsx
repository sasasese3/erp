import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import POTableBody from "../components/POTableBody";
import { getLocaltime } from "../utils/getlocaltime";
import { MenuData } from "../utils/products";
import { POPayload, Product } from "../utils/responseType";

function POPage() {
  const [poHeaderPayload, setPOHeaderPayload] = useState<POPayload>({
    date: getLocaltime().toISOString().split("T")[0],
    create_name: "",
    seller_name: "",
    account_name: "",
    producer_name: "",
    total_price: 0,
  });

  const [products, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    console.log(poHeaderPayload);
  }, []);

  const templateAddProduct: Product = {
    ...MenuData[0],
    amount: 0,
    price: 0,
  };

  const handleClickAddProduct = () => {
    setProduct([...products, templateAddProduct]);
  };

  const handleChangeProduct = (idx: number, value: string) => {
    const newProducts = [...products];
    const newProduct = MenuData.filter(
      (data) => data.product_name === value
    )[0];

    newProducts[idx].per_amount = newProduct.per_amount;
    newProducts[idx].stock = newProduct.stock;
    newProducts[idx].product_name = newProduct.product_name;
    newProducts[idx].amount = Math.min(
      newProducts[idx].amount,
      newProduct.stock
    );
    newProducts[idx].price = newProducts[idx].amount * newProduct.per_amount;
    setProduct(newProducts);

    const totalPrice = products.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);

    poHeaderPayload.total_price = totalPrice;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

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

  const handleChangePOHeader = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
    poHeaderPayload[event.target.id as keyof typeof poHeaderPayload] =
      event.target.value;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

  const handleFormSummit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(poHeaderPayload);
    console.log(products);
  };

  const isDisableButton = () => {
    let isEmpty = false;
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
                onChange={handleChangePOHeader}
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
                value={poHeaderPayload.create_name}
                onChange={handleChangePOHeader}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ชื่อพนักงานขาย</FormLabel>
              <Input
                id="seller_name"
                value={poHeaderPayload.seller_name}
                onChange={handleChangePOHeader}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ชื่อบัญชี</FormLabel>
              <Input
                id="account_name"
                value={poHeaderPayload.account_name}
                onChange={handleChangePOHeader}
                type="text"
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl isRequired>
              <FormLabel>ผู้ผลิต</FormLabel>
              <Input
                id="producer_name"
                value={poHeaderPayload.producer_name}
                onChange={handleChangePOHeader}
                type="text"
              ></Input>
            </FormControl>
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
          {products.length !== 0 && (
            <GridItem colSpan={3}>
              <Table>
                <Thead>
                  <Tr>
                    <Th> ลำดับ </Th>
                    <Th> ชื่อสินค้า </Th>
                    <Th> จำนวน </Th>
                    <Th> คงเหลือ </Th>
                    <Th> ราคาต่อหน่วย </Th>
                    <Th> ราคารวม </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {products.map((product, idx) => (
                    <POTableBody
                      key={idx}
                      idx={idx}
                      {...product}
                      setProduct={handleChangeAmount}
                      handleChangeProduct={handleChangeProduct}
                    ></POTableBody>
                  ))}
                </Tbody>
              </Table>
            </GridItem>
          )}
          {products.length < 10 && (
            <GridItem colSpan={3}>
              <Button variant="ghost" onClick={handleClickAddProduct}>
                CLICK TO ADD PRODUCT
              </Button>
            </GridItem>
          )}
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
