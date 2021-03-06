import {
  AspectRatio,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
} from "@chakra-ui/react";
import LinkwithReact from "../components/LinkwithReact";

function HomePage() {
  return (
    <>
      <Container height="100vh" maxW="container.lg">
        <Flex
          direction="column"
          height="100%"
          gap={4}
          justifyContent="space-evenly"
        >
          <Center>
            <AspectRatio ratio={16 / 9} width="80%">
              <Image src="http://www.fmsconsult.com/images/5.jpg"></Image>
            </AspectRatio>
          </Center>
          <Flex direction="column" gap={5}>
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
              <LinkwithReact to="/login">
                <Button>เข้าสู่ระบบ</Button>
              </LinkwithReact>
              <LinkwithReact to="/register">
                <Button colorScheme={"whatsapp"}>สมัครสมาชิก</Button>
              </LinkwithReact>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

export default HomePage;
