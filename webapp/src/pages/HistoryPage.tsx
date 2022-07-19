import { Center, Flex, Heading, Select, Skeleton } from "@chakra-ui/react";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import HistoryTable from "../components/HistoryTable";

function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchType, setFetchType] = useState("po");
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/erp/${fetchType}`);
        const { data } = response.data;
        setHistoryData(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        setHistoryData([]);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchData();
  }, [fetchType]);
  return (
    <>
      <Heading>ประวัติการสร้างใบสำคัญ</Heading>
      <Flex
        direction="column"
        bg="whiteAlpha.900"
        my={5}
        p={5}
        height="100%"
        gap={5}
      >
        <Select
          width="33%"
          value={fetchType}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            setIsLoading(true);
            setFetchType(event.target.value);
          }}
        >
          <option value="po">ใบสำคัญสั่งซื้อ PO</option>
          <option value="rv">ใบสำคัญรับเงิน RV</option>
          <option value="pv">ใบสำคัญสั่งจ่าย PV</option>
          <option value="ap3">ใบสำคัญแจ้งหนี้ AP3</option>
          <option value="ib">ใบสำคัญรับสินค้า IB</option>
        </Select>
        {isLoading ? (
          <Skeleton height="300px" />
        ) : historyData.length != 0 ? (
          <HistoryTable type={fetchType} datas={historyData}></HistoryTable>
        ) : (
          <Center>
            <Heading size="md">ไม่มีข้อมูล</Heading>
          </Center>
        )}
      </Flex>
    </>
  );
}

export default HistoryPage;
