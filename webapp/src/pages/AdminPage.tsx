import {
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminTableBody from "../components/AdminTableBody";
import { Employee } from "../utils/responseType";

function AdminPage() {
  const [employees, setEmployees] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/admin/employee");
      const { data } = response.data;
      setEmployees(data);
    };

    fetchData();
    setRefreshData(false);
  }, [refreshData]);
  return (
    <Flex direction={"column"} bg="whiteAlpha.900" p={5} borderRadius={"md"}>
      <Heading> รายชื่อพนักงานทั้งหมด </Heading>
      <TableContainer background={"papayawhip"} my={5} width="150%">
        <Table variant="striped" colorScheme={"twitter"}>
          <Thead>
            <Tr>
              <Th> รหัสพนักงาน </Th>
              <Th> อีเมล </Th>
              <Th> ชื่อผู้ใช้ </Th>
              <Th> ชื่อจริง </Th>
              <Th> นามสกุล </Th>
              <Th> หน้าที่ </Th>
              <Th> สถานะการยืนยัน </Th>
              <Th> เปลี่ยนหน้าที่</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((employee: Employee) => (
              <AdminTableBody
                key={employee.id}
                id={employee.id}
                email={employee.email}
                firstname={employee.firstname}
                lastname={employee.lastname}
                role={employee.role}
                username={employee.username}
                verified={employee.verified}
                setUpdate={setRefreshData}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default AdminPage;
