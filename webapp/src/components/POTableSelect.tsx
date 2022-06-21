import { Select } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { MenuData } from "../utils/products";

type POTableSelectProps = {
  handleChangeProduct: Function;
  idx: number;
};
function POTableSelect({ handleChangeProduct, idx }: POTableSelectProps) {
  const [selectedChoice, setSelectedChoice] = useState("");
  return (
    <Select
      value={selectedChoice}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedChoice(event.target.value);
        handleChangeProduct(idx, event.target.value);
      }}
    >
      {MenuData.map((choice) => (
        <option key={choice.product_name} value={choice.product_name}>
          {choice.product_name}
        </option>
      ))}
    </Select>
  );
}

export default POTableSelect;
