import { Button } from "@chakra-ui/react";
import axios from "axios";
import { FaBan, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function InspectorHistoryStatus({ id, type, status }: any) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/approve", { state: { id, type } });
  };
  switch (status) {
    case "pending":
      return (
        <Button colorScheme="gray" variant="outline" onClick={handleClick}>
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
        <Button colorScheme="green" variant="outline" disabled>
          <FaCheck style={{ marginRight: "10px" }} /> อนุมัติ
        </Button>
      );
    default:
      return <Button></Button>;
  }
}

export default InspectorHistoryStatus;
