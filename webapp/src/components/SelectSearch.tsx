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
import { Product } from "../utils/responseType";

type CustomSelectSearchProps = {
  handleChangeSupplierID: Function;
  setProduct: React.Dispatch<React.SetStateAction<Product[]>>;
};
function CustomSelectSearch({
  handleChangeSupplierID,
  setProduct,
}: CustomSelectSearchProps) {
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [searchResult, setSearchResult] = useState([]);

  const toast = useToast();

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
        position: "top-right",
        duration: 2000,
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
      <FormLabel htmlFor="supplier">ผู้ผลิต</FormLabel>
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
        <FormErrorMessage>กรุณาเลือกผู้ผลิต</FormErrorMessage>
      ) : (
        <FormHelperText>
          ถ้าเปลี่ยนผู้ผลิต ข้อมูลสินค้าจะหายไปทั้งหมด
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomSelectSearch;
