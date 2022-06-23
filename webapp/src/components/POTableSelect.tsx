import { Select } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { Product } from "../utils/responseType";

type POTableSelectProps = {
  options: Product[];
  handleChangeProduct: Function;
  idx: number;
};
function POTableSelect({
  options,
  handleChangeProduct,
  idx,
}: POTableSelectProps) {
  const [selectedChoice, setSelectedChoice] = useState("");
  return (
    <Select
      value={selectedChoice}
      onChange={(event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedChoice(event.target.value);
        handleChangeProduct(idx, parseInt(event.target.value));
      }}
    >
      {options.map((choice) => (
        <option key={choice.id} value={choice.id}>
          {choice.name}
        </option>
      ))}
    </Select>
  );
}

export default POTableSelect;
