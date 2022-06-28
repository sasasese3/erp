import { Button } from "@chakra-ui/react";
import axios from "axios";
import { FaBan, FaCheck } from "react-icons/fa";

function EmployeeHistoryStatus({ id, type, status }: any) {
  const handleDownloadFile = async () => {
    const response = await axios.get(`/erp/${type}/pdf/${id}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${type}.pdf`); //or any other extension
    document.body.appendChild(link);
    link.click();
  };
  switch (status) {
    case "pending":
      return (
        <Button colorScheme="gray" variant="outline" disabled>
          รอการพิจารณา
        </Button>
      );

    case "rejected":
      return (
        <Button colorScheme="red" variant="outline" disabled>
          <FaBan style={{ marginRight: "10px" }} />
          ไม่อนุมัติ
        </Button>
      );
    case "approved":
      return (
        <Button
          onClick={handleDownloadFile}
          colorScheme="green"
          variant="outline"
        >
          <FaCheck style={{ marginRight: "10px" }} /> อนุมัติ
        </Button>
      );
    default:
      return <Button></Button>;
  }
}

export default EmployeeHistoryStatus;
