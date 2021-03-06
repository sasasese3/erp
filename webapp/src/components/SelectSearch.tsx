import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { AsyncSelect } from "chakra-react-select";
import { useEffect } from "react";
import { useState } from "react";
import useTLToast from "../hooks/useTLToast";
import { Product } from "../utils/responseType";

type CustomSelectSearchProps = {
  change?: boolean;
  handleChangeSupplierID: Function;
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
};
function CustomSelectSearch({
  change,
  handleChangeSupplierID,
  setProduct,
}: CustomSelectSearchProps) {
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const name = change ? "โรงงาน" : "ผู้ผลิต";

  const toast = useTLToast();

  const fetchData = async (q: string) => {
    try {
      const response = await axios.get("/employee/supplier", {
        params: {
          q: q,
        },
      });
      const { data } = response.data;
      const result = data.map((temp: any) => {
        return { value: temp.id, label: temp.name };
      });
      return result;
    } catch (err) {
      console.log(err);
      toast({
        title: "Something went wrong.",
        status: "error",
      });
    }
  };

  useEffect(() => {
    const fetchDefaultOptions = async () => {
      const result = await fetchData("");
      setDefaultOptions(result);
    };
    fetchDefaultOptions();
  }, []);
  return (
    <FormControl isRequired isInvalid={searchResult.length === 0}>
      <FormLabel htmlFor="supplier">{name}</FormLabel>
      <AsyncSelect
        isRequired
        id="supplier"
        onChange={async (value: any) => {
          handleChangeSupplierID(value.value);
          const result = await fetchData(value.label);
          setSearchResult(result);
          setProduct([]);
        }}
        loadOptions={(input, callback) => {
          setTimeout(async () => {
            const result = await fetchData(input);
            setSearchResult(result);
            callback(result);
          }, 500);
        }}
        defaultOptions={defaultOptions}
      ></AsyncSelect>
      {searchResult.length == 0 ? (
        <FormErrorMessage>{`กรุณาเลือก${name}`}</FormErrorMessage>
      ) : (
        <FormHelperText>
          {`ถ้าเปลี่ยน${name} ข้อมูลสินค้าจะหายไปทั้งหมด`}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomSelectSearch;
