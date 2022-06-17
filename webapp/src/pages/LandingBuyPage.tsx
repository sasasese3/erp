import {
  AspectRatio,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import LayoutWithNav from "./templates/LayoutWithNav";

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
    <Grid templateColumns="repeat(2,1fr)" h="1fr" gap={4} pt={2}>
      {cardData.map((card) => (
        <GridItem
          bg="whiteAlpha.900"
          p={4}
          borderRadius={10}
          _hover={{ boxShadow: "5px 5px 10px gray" }}
        >
          <Link
            as={ReactLink}
            to={card.link}
            _hover={{ textDecoration: "none" }}
          >
            <Flex direction="column" gap={2}>
              <Center>
                <AspectRatio ratio={16 / 9} width="100%">
                  <Image src={card.image} borderRadius={10}></Image>
                </AspectRatio>
              </Center>
              <Heading size={"md"}>{card.name}</Heading>
              <p> {card.description}</p>
            </Flex>
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
}

export default LandingBuyPage;
