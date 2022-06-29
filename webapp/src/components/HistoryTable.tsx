import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { ROLES } from "../utils/roles";
import EmployeeHistoryStatus from "./EmployeeHistoryStatus";
import InspectorHistoryStatus from "./InspectorHistoryStatus";

function HistoryTable({ type, datas }: any) {
  const { auth } = useAuth();
  return (
    <Table>
      <Thead>
        <Tr>
          <Th> เลขที่ใบสำคัญ</Th>
          <Th> วันที่ออกใบสำคัญ</Th>
          <Th> วันที่อนุมัติใบสำคัญ</Th>
          <Th> ชื่อผู้ผลิต </Th>
          <Th>
            {auth?.role === ROLES.INSPECTOR
              ? "รหัสพนักงาน - ชื่อผู้ขอใบสำคัญ"
              : "รหัสพนักงาน - ชื่อผู้ประเมิน"}
          </Th>
          <Th> สถานะของใบสำคัญ</Th>
        </Tr>
      </Thead>
      <Tbody>
        {datas.map((data: any) => {
          let id;
          switch (type) {
            case "pv":
              id = data.pv_id;
              break;
            case "rv":
              id = data.rv_id;
              break;
            default:
              id = data.id;
              break;
          }
          return (
            <Tr key={data.id}>
              <Td>{data.id}</Td>
              <Td>{new Date(data.createdAt).toLocaleDateString("en-GB")}</Td>
              <Td>
                {data.status !== "pending"
                  ? new Date(data.updatedAt).toLocaleDateString("en-GB")
                  : "รอการพิจารณา"}
              </Td>
              <Td>{data.Supplier.name}</Td>
              <Td>
                {auth?.role === ROLES.INSPECTOR
                  ? `${data.Employee?.id} ${data.Employee?.firstname}`
                  : data.inspector
                  ? `${data.inspector?.id} ${data.inspector?.firstname}`
                  : "รอการพิจารณา"}
              </Td>
              <Td>
                {auth?.role === ROLES.INSPECTOR ? (
                  <InspectorHistoryStatus
                    type={type}
                    id={id}
                    status={data.status}
                  />
                ) : (
                  <EmployeeHistoryStatus
                    type={type}
                    id={id}
                    status={data.status}
                  />
                )}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default HistoryTable;
