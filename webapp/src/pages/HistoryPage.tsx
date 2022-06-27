import { AspectRatio, Flex, Grid, GridItem } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function HistoryPage() {
  const [type, setFetchType] = useState("po");
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/erp/po");
      const { data } = response.data;
      setHistoryData(data);
    };
    fetchData();
  }, [type]);
  return (
    <Flex direction="column">
      {historyData.map((data: any) => (
        <div>
          {data.id} {new Date(data.createdAt).toLocaleDateString("en-GB")}{" "}
          {data.Supplier?.name} {data.status}
        </div>
      ))}
      {/* <AspectRatio>
        <iframe src="http://localhost:3333/erp/po"></iframe>
      </AspectRatio> */}
    </Flex>
  );
}

export default HistoryPage;
