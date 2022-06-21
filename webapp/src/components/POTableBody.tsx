import { Input, Td, Tr } from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { Product } from "../utils/responseType";

type POTableBodyProps = Product & {
  idx: number;
  setProduct: ChangeEventHandler<HTMLInputElement>;
};
function POTableBody({
  idx,
  product_name,
  amount,
  per_amount,
  price,
  stock,
  setProduct,
}: POTableBodyProps) {
  return (
    <Tr key={idx}>
      <Td>{idx + 1}</Td>
      <Td>{product_name}</Td>
      <Td>
        <Input
          id={idx.toString()}
          value={amount}
          max={stock}
          onChange={setProduct}
          type="number"
        ></Input>
      </Td>
      <Td>{stock.toLocaleString()}</Td>
      <Td>{per_amount.toLocaleString()}</Td>
      <Td>{price.toLocaleString()}</Td>
    </Tr>
  );
}

export default POTableBody;
