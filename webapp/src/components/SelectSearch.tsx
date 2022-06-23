import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { AsyncSelect, Select } from "chakra-react-select";
import { useEffect } from "react";
import { ChangeEventHandler } from "react";
import { useState } from "react";

type CustomSelectSearchProps = {
  handleChangeSupplierID: Function;
};
function CustomSelectSearch({
  handleChangeSupplierID,
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
    <AsyncSelect
      isRequired
      id="supplier"
      placeholder="เลือกผู้ผลิตที่ต้องการ"
      onChange={(value: any) => handleChangeSupplierID(value.value)}
      loadOptions={(input, callback) => {
        setTimeout(async () => {
          const result = await fetchData(input);
          setSearchResult(result);
          callback(result);
        }, 500);
      }}
      defaultOptions={defaultOptions}
    ></AsyncSelect>
  );
}

export default CustomSelectSearch;
