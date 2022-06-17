import {
  AspectRatio,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Link,
} from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Container minH="100vh" maxW="container.lg">
        <Flex direction="column" height="100%" gap={4}>
          <Center>
            <AspectRatio ratio={16 / 9} width="80%">
              <Image src="http://www.fmsconsult.com/images/5.jpg"></Image>
            </AspectRatio>
          </Center>
          <Heading>ERP (Enterprise Resource Planning)</Heading>
          <p style={{ textIndent: "3rem" }}>
            ERP ย่อมาจาก Enterprise Resource Planning หรือ
            การวางแผนทรัพย์กรขององค์กร ซึ่งระบบ ERP
            นั้นจะครอบคลุมตั้งแต่การวางแผนและการจัดการฐานข้อมูล โดย ERP
            จะเป็นการเชื่อมโยงระบบงานต่างๆ ขององค์กรไว้ในที่เดียวกัน
            เพื่อให้เป็นระบบมาตรฐานเดียวกัน
          </p>
          <p style={{ textIndent: "3rem" }}>
            เพื่อให้การใช้งานที่รวดเร็วและไม่ยุ่งยากในการทำงานและหากมีปัญหาในการปฏิบัติงานเกิดขึ้นสามารถรู้ถึงผลกระทบที่จะเกิดขึ้นกับหน่วยงานของตนและสามารถวางแผน
            แก้ไขปัญหาได้อย่างรวดเร็ว
            เพื่อให้องค์กรนั้นมีการบริหารและการใช้ทรัพยากรร่วมกันอย่างมีประสิทธิภาพมากยิ่งขึ้น
          </p>
          <Flex justifyContent="space-around">
            <Link
              as={ReactLink}
              to="/login"
              _hover={{ textDecoration: "none" }}
            >
              <Button>เข้าสู่ระบบ</Button>
            </Link>
            <Link
              as={ReactLink}
              to="/register"
              _hover={{ textDecoration: "none" }}
            >
              <Button colorScheme={"whatsapp"}>สมัครสมาชิก</Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default HomePage;
