import { Grid } from "@chakra-ui/react";
import CardComponent from "../components/CardComponent";

const cardData = [
  {
    id: 1,
    name: "ใบสำคัญสั่งซื้อ PO",
    description:
      "ท่านสามารถทำการสร้างใบสำคัญสั่งซื้อสินค้า PO เพื่อทำหลักฐานการสั่งซื้อ",
    image:
      "https://www.scimath.org/images/stories/flexicontent/item_6184_field_43/l_6184.jpg",
    link: "/buy/po",
  },
  {
    id: 2,
    name: "ใบสำคัญรับเงิน RV",
    description:
      "ท่านสามารถทำการสร้างใบสำคัญรับเงิน RV เพื่อเป็นหลักฐานในการรับเงินหรือการทำธุรกรรม",
    image:
      "https://www.scimath.org/images/stories/flexicontent/item_6184_field_43/l_6184.jpg",
    link: "/buy/rv",
  },
];

function LandingBuyPage() {
  return (
    <Grid templateColumns="repeat(2,1fr)" gap={5} mt={5}>
      {cardData.map((card) => (
        <CardComponent key={card.id} {...card}></CardComponent>
      ))}
    </Grid>
  );
}

export default LandingBuyPage;
