import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { FaBan, FaCheck } from "react-icons/fa";

function EmployeeHistoryStatus({ id, type, status, message }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <>
          <Button colorScheme="red" variant="outline" onClick={onOpen}>
            <FaBan style={{ marginRight: "10px" }} />
            ไม่อนุมัติ
          </Button>
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color='red.600'>เหตุผลในการไม่อนุมัติ
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody whiteSpace={'pre-wrap'}>{message?.trim()}</ModalBody>
              <ModalFooter>
                <Button colorScheme='red' variant='outline' onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
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
