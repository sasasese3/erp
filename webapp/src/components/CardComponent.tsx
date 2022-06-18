import {
  AspectRatio,
  Center,
  Flex,
  GridItem,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";
import LinkwithReact from "./LinkwithReact";

type CardProps = {
  id: number;
  name: string;
  description: string;
  image: string;
  link: string;
};
function CardComponent({ ...card }: CardProps) {
  return (
    <GridItem
      bg="whiteAlpha.900"
      p={4}
      borderRadius={10}
      _hover={{ boxShadow: "5px 5px 10px gray" }}
    >
      <LinkwithReact to={card.link}>
        <Flex direction="column" gap={2}>
          <Center>
            <AspectRatio ratio={16 / 9} width="100%">
              <Image src={card.image} borderRadius={10}></Image>
            </AspectRatio>
          </Center>
          <Heading size={"md"} p={2}>
            {card.name}
          </Heading>
          <p style={{ padding: "0px 8px" }}>{card.description}</p>
        </Flex>
      </LinkwithReact>
    </GridItem>
  );
}

export default CardComponent;
