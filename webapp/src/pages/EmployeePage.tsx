import { Grid, Heading } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent";

const cardData = [
  {
    id: 1,
    name: "ใบสำคัญซื้อ",
    description:
      "ระบบที่ใช้ควบคุมการจ่ายเงินที่มีเอกสารประกอบ โดยนำทั้งหมดมาตรวจสอบ และเก็บข้อมูล จดบันทึก ไว้เป็นหลักฐาน โดยกระบวนการทั้งหมด จะต้องมีการเซ็นอนุมัติจ่ายเงิน และจัดเก็บไว้ในทะเบียนใบสำคัญจ่ายอย่างครบถ้วน",
    image: "https://inwfile.com/s-cu/tl5xvh.png",
    link: "/buy",
  },
  {
    id: 2,
    name: "ใบสำคัญขาย",
    description:
      "เอกสารที่ใช้เป็นหลักฐานในการจ่ายเงิน จัดทำโดยพนักงานในแผนกบัญแล้วส่งไปให้ผู้มีหน้าที่ตรวจสอบ ก่อนที่ผู้มีอำนาจจ่ายเงินจะลงนามอนุมัติการจ่ายเงิน",
    image:
      "https://s.isanook.com/ca/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2NhLzAvdWQvMjc4LzEzOTE0MjUvaXN0b2NrLTg1ODUwODAwOC5qcGc=.jpg",
    link: "/sell",
  },
  {
    id: 3,
    name: "ใบสำคัญรับสินค้า",
    description:
      "ใช้บันทึกรายการซื้อผลิตผล/สินค้าจากสมาชิก ซึ่งไม่มีใบเสร็จรับเงินหรือใบกำกับสินค้าออกให้แก่สหกรณ์ไม่ว่าจะเป็นการซื้อเงินสดหรือเงินเชื่อ",
    image:
      "https://image.ezymar.com/article/20190901/12/2035d300-4877-42bb-abe5-e7ac32480409.jpg",
    link: "/ib",
  },
  {
    id: 4,
    name: "เรียกดูใบสำคัญ",
    description:
      "เรียกดูใบสำคัญที่กำลังดำเนินการอยู่ และยังสามารถนำกลับมาแก้ไขได้หลังจากยื่นไปแล้วจนกว่าจะถึงระยะเวลาที่จะทำการเซ็นอนุมัติ",
    image: "https://mpics.mgronline.com/pics/Images/559000013114301.JPEG",
    link: "/history",
  },
];

function EmployeePage() {
  return (
    <>
      <Heading>ใบสำคัญ</Heading>
      <Grid
        templateColumns="repeat(2,1fr)"
        templateRows="repeat(2,1fr)"
        gap={5}
        pt={5}
      >
        {cardData.map((card) => (
          <CardComponent key={card.id} {...card}></CardComponent>
        ))}
      </Grid>
    </>
  );
}

export default EmployeePage;
