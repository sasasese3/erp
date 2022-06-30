import {
  Button,
  GridItem,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  IBPayload,
  POPayload,
  Product,
  RVPayload,
} from "../../utils/responseType";
import TableBody from "./TableBody";

type TableWithAddButtonProps = {
  products: Product[];
  headerPayload: POPayload | RVPayload | IBPayload;
  supplier_id: number;
  handleChangeAmount: ChangeEventHandler<HTMLInputElement>;
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
  setHeaderPayload:
    | React.Dispatch<React.SetStateAction<POPayload>>
    | React.Dispatch<React.SetStateAction<RVPayload>>
    | React.Dispatch<React.SetStateAction<IBPayload>>;
};

function POTableWithAddButton({
  products,
  headerPayload,
  supplier_id,
  handleChangeAmount,
  setProduct,
  setHeaderPayload,
}: TableWithAddButtonProps) {
  const [options, setOptions] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/employee/product", {
        params: {
          supplier_id,
        },
      });
      const { data } = response.data;
      const formattedData = data.map((product: any) => {
        const { SupplierId, ...rest } = product;
        return {
          ...rest,
          amount: 0,
          price: 0,
        };
      });
      setOptions(formattedData);
    };

    fetchData();
  }, [supplier_id]);

  const handleChangeProduct = (idx: number, value: number) => {
    const newProducts = [...products];
    const newProduct = options.filter((data) => data.id === value)[0];

    newProducts[idx].per_amount = newProduct.per_amount;
    newProducts[idx].stock = newProduct.stock;
    newProducts[idx].id = newProduct.id;
    newProducts[idx].amount = Math.min(
      newProducts[idx].amount,
      newProduct.stock
    );
    newProducts[idx].price = newProducts[idx].amount * newProduct.per_amount;
    setProduct([...newProducts]);

    const totalPrice = products.reduce((prev, curr) => {
      return prev + curr.price;
    }, 0);

    headerPayload.total_price = totalPrice;
    setHeaderPayload({ ...headerPayload } as POPayload & RVPayload & IBPayload);
  };

  const handleClickAddProduct = () => {
    setProduct([...products, { ...options[0] }]);
  };
  return (
    <>
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
                <TableBody
                  key={idx}
                  idx={idx}
                  {...product}
                  options={options}
                  setProduct={handleChangeAmount}
                  handleChangeProduct={handleChangeProduct}
                ></TableBody>
              ))}
            </Tbody>
          </Table>
        </GridItem>
      )}
      {products.length < 10 && (
        <GridItem colSpan={3}>
          <Button
            disabled={supplier_id === 0}
            variant="ghost"
            onClick={handleClickAddProduct}
          >
            CLICK TO ADD PRODUCT
          </Button>
        </GridItem>
      )}
    </>
  );
}

export default POTableWithAddButton;
