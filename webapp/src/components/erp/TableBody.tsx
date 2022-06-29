import { Input, Td, Tr } from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { Product } from "../../utils/responseType";
import TableSelect from "./ProductSelect";

type TableBodyProps = Product & {
  idx: number;
  setProduct: ChangeEventHandler<HTMLInputElement>;
  handleChangeProduct: Function;
  options: Product[];
};
function TableBody({
  idx,
  name,
  amount,
  per_amount,
  price,
  stock,
  setProduct,
  handleChangeProduct,
  options,
}: TableBodyProps) {
  return (
    <Tr key={idx}>
      <Td>{idx + 1}</Td>
      <Td>
        <TableSelect
          options={options}
          handleChangeProduct={handleChangeProduct}
          idx={idx}
        ></TableSelect>
      </Td>
      <Td>
        <Input
          id={idx.toString()}
          value={amount}
          max={stock}
          onChange={setProduct}
          type="number"
          width="full"
        ></Input>
      </Td>
      <Td>{stock.toLocaleString()}</Td>
      <Td>{per_amount.toLocaleString()}</Td>
      <Td>{price.toLocaleString()}</Td>
    </Tr>
  );
}

export default TableBody;
