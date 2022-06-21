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
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

type POPayload = {
  date: string;
  create_name: string;
  seller_name: string;
  account_name: string;
  producer_name: string;
  total_price: number;
};

type Product = {
  product_name: string;
  amount: number;
  stock: number;
  per_amount: number;
  price: number;
};

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
  return (
    <>
      <Heading> ใบสำคัญสั่งซื้อ PO</Heading>
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
            <Input type="date"></Input>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>ชื่อผู้จัดทำ</FormLabel>
            <Input type="text"></Input>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>ชื่อพนักงานขาย</FormLabel>
            <Input type="text"></Input>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>ชื่อบัญชี</FormLabel>
            <Input type="text"></Input>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>ผู้ผลิต</FormLabel>
            <Input type="text"></Input>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isRequired>
            <FormLabel>จำนวนเงินทั้งหมด</FormLabel>
            <Input
              value={0}
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
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{product.product_name}</Td>
                    <Td>
                      <Input
                        id="amount"
                        value={product.amount}
                        max={product.stock}
                        type="number"
                      ></Input>
                    </Td>
                    <Td>{product.stock}</Td>
                    <Td>{product.per_amount}</Td>
                    <Td>{product.price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </GridItem>
        )}
        <GridItem colSpan={3}>
          <Button variant="ghost" onClick={handleClickAddProduct}>
            {" "}
            CLICK TO ADD PRODUCT
          </Button>
        </GridItem>
      </Grid>
    </>
  );
}

export default POPage;
