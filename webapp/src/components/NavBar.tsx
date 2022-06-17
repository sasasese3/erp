import { Center, Flex, Grid, GridItem, Image, Text } from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";

function NavBar() {
  const { auth } = useAuth();
  return (
    <>
      <Flex
        background="telegram.400"
        height="50px"
        justify="center"
        align="center"
      >
        <Grid templateColumns="200px 1fr" w="100%">
          <GridItem bg="gray"></GridItem>
          <GridItem bg="whatsapp.400" justifyContent={"center"}>
            <Center>
              <Text>{auth?.email}</Text>
            </Center>
          </GridItem>
        </Grid>
      </Flex>
    </>
  );
}

export default NavBar;
