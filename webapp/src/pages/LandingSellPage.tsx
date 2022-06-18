import { Grid } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent";

const cardData = [
  {
    id: 1,
    name: "ใบสำคัญสั่งจ่าย PV",
    description:
      "ท่านสามารถทำการสร้างใบสำคัญสั่งจ่าย PV เพื่อดำเนินการทำใบสำคัญสำหรับจ่ายสินค้าต่างๆ",
    image:
      "https://www.scimath.org/images/stories/flexicontent/item_6184_field_43/l_6184.jpg",
    link: "/sell/pv",
  },
  {
    id: 2,
    name: "ใบสำคัญแจ้งหนี้ AP3",
    description:
      "ท่านสามารถทำการสร้างใบสำคัญแจ้งหนี้ AP3 เพื่อทำการแจ้งหนี้หรือแจ้งผู้ชำระ",
    image:
      "https://www.scimath.org/images/stories/flexicontent/item_6184_field_43/l_6184.jpg",
    link: "/sell/ap3",
  },
];

function LandingSellPage() {
  return (
    <Grid
      templateColumns={{ sm: "repeat(1,1fr)", md: "repeat(2,1fr)" }}
      gap={5}
      mt={5}
    >
      {cardData.map((card) => (
        <CardComponent key={card.id} {...card}></CardComponent>
      ))}
    </Grid>
  );
}

export default LandingSellPage;
