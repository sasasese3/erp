import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";

function RegisterPage() {
  return (
    <Flex
      direction="column"
      minH="100vh"
      width="100wh"
      justify="center"
      align="center"
      padding={10}
    >
      <VStack spacing={4}>
        <Heading color="twitter.400"> สมัครสมาชิก</Heading>
        <form>
          <Grid
            background="whiteAlpha.900"
            templateColumns={{ base: "1fr", md: "1fr 1fr" }}
            minW={{ base: "60%", md: "468px" }}
            gap={3}
            p={5}
          >
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="username">ชื่อผู้ใช้ / Username</FormLabel>
                <Input id="username" type="text"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="password"> รหัสผ่าน / Password </FormLabel>
                <Input id="password" type="password"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="firstname">ชื่อจริง</FormLabel>
                <Input id="firstname" type="text"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="lastname">นามสกุล</FormLabel>
                <Input id="lastname" type="text"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="email"> อีเมล </FormLabel>
                <Input id="email" type="email"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="employeeid"> รหัสพนักงาน </FormLabel>
                <Input id="employeeid" type="email"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="phone_no">เบอร์โทรติดต่อ</FormLabel>
                <Input id="phone_no" type="text"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="ssn">เลขประจำตัวประชาชน</FormLabel>
                <Input id="ssn" type="text"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={{ base: 2, md: 1 }}>
              <FormControl isRequired>
                <FormLabel htmlFor="birthdate">วัน/เดือน/ปีเกิด</FormLabel>
                <Input
                  id="birthdate"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                ></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <FormControl isRequired>
                <FormLabel htmlFor="address">ที่อยู่</FormLabel>
                <Input id="address" type="text"></Input>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="department">แผนก</FormLabel>
                <Input id="department" type="text"></Input>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl isRequired>
                <FormLabel htmlFor="position">ตำแหน่ง</FormLabel>
                <Input id="position" type="text"></Input>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2}>
              <Checkbox>
                ข้าพเจ้าเข้าใจและตกลงตาม เงื่อนไขการให้บริการ และ
                นโยบายความเป็นส่วนตัว
              </Checkbox>
            </GridItem>
            <GridItem colSpan={2}>
              <Button type="submit" width="full">
                {" "}
                สมัครสมาชิก
              </Button>
            </GridItem>
          </Grid>
        </form>
      </VStack>
    </Flex>
  );
}

export default RegisterPage;
