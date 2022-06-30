import {
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

function AccountPage() {
  const { auth } = useAuth();
  return (
    <>
      <Heading>ข้อมูลบัญชี</Heading>
      <form>
        <Grid
          background="whiteAlpha.900"
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          minW={{ base: "60%", md: "468px" }}
          gap={3}
          p={5}
          mt={5}
          borderRadius={"md"}
        >
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="username">ชื่อผู้ใช้ / Username</FormLabel>
              <Input
                value={auth?.username}
                id="username"
                type="text"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="email"> อีเมล </FormLabel>
              <Input
                value={auth?.email}
                id="email"
                type="email"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="firstname">ชื่อจริง</FormLabel>
              <Input
                value={auth?.firstname}
                id="firstname"
                type="text"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="lastname">นามสกุล</FormLabel>
              <Input
                value={auth?.lastname}
                id="lastname"
                type="text"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="id"> รหัสพนักงาน </FormLabel>
              <Input
                value={auth?.id}
                id="id"
                type="text"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="phone_no">เบอร์โทรติดต่อ</FormLabel>
              <Input
                value={auth?.phone_no}
                id="phone_no"
                type="tel"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="ssn">เลขประจำตัวประชาชน</FormLabel>
              <Input
                value={auth?.ssn}
                id="ssn"
                type="text"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="birthdate">วัน/เดือน/ปีเกิด</FormLabel>
              <Input
                value={new Date(auth?.birthdate!).toISOString().split("T")[0]}
                id="birthdate"
                type="date"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl isRequired>
              <FormLabel htmlFor="address">ที่อยู่</FormLabel>
              <Input
                value={auth?.address}
                id="address"
                type="text"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="department">แผนก</FormLabel>
              <Input
                value={auth?.department}
                id="department"
                type="text"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <FormControl isRequired>
              <FormLabel htmlFor="position">ตำแหน่ง</FormLabel>
              <Input
                value={auth?.position}
                id="position"
                type="text"
                variant="filled"
                readOnly
              ></Input>
            </FormControl>
          </GridItem>
        </Grid>
      </form>
    </>
  );
}

export default AccountPage;
