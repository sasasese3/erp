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
import { ChangeEvent, FormEvent, useState } from "react";
import POTableBody from "../components/POTableBody";
import { POPayload, Product } from "../utils/responseType";

function POPage() {
  const [poHeaderPayload, setPOHeaderPayload] = useState<POPayload>({
    date: "",
    create_name: "",
    seller_name: "",
    account_name: "",
    producer_name: "",
    total_price: 0,
  });

  const [products, setProduct] = useState<Product[]>([]);

  const templateAddProduct: Product = {
    product_name: "โต๊ะ",
    amount: 0,
    stock: 550,
    per_amount: 200,
    price: 0,
  };

  const handleClickAddProduct = () => {
    setProduct([...products, templateAddProduct]);
  };

  const handleChangeProduct = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newProducts = [...products];

    const idx = parseInt(event.target.id);
    let value = parseInt(event.target.value) || 0;
    value = Math.min(newProducts[idx].stock, value);

    newProducts[idx].amount = value;
    newProducts[idx].price = value * newProducts[idx].per_amount;

    console.log(newProducts[idx].amount);
    setProduct(newProducts);

    const totalPrice = products.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);

    poHeaderPayload.total_price = totalPrice;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

  const handleChangePOHeader = (event: ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    poHeaderPayload[event.target.id as keyof typeof poHeaderPayload] =
      event.target.value;
    setPOHeaderPayload({ ...poHeaderPayload });
  };

  const handleFormSummit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(poHeaderPayload);
    console.log(products);
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
                      setProduct={handleChangeProduct}
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
            <Button type="submit" width="full">
              บันทึกข้อมูล
            </Button>
          </GridItem>
        </Grid>
      </form>
    </>
  );
}

export default POPage;
