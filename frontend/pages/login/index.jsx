/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

const index = () => {
  const router = useRouter();

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="#319795"
    >
      <Box width="580px" py="40px">
        <Card>
          <CardBody py="40px" px="32px">
            <Flex justifyContent="center">
              <Image
                src="/images/eco.png"
                height="104px"
                // width="54px"
                alt="recycle"
                mr="10px"
              />
            </Flex>

            <Text
              textAlign="center"
              fontSize="34px"
              fontWeight="800"
              color="#000"
              mt="20px"
            >
              Inventro
            </Text>
            <Text fontSize="26px" fontWeight="700" mb="10px" color="#000">
              Login
            </Text>
            <Text fontSize="18px" fontWeight="500" color="GrayText">
              Enter login credentials to continue
            </Text>
            <Input placeholder="Email" mb="10px" size="lg" />
            <Input placeholder="Password" mb="30px" size="lg" />
            <Button
              mt="20px"
              height="52px"
              colorScheme="teal"
              width="100%"
              onClick={() => router.push("/dashboard")}
              py="20px"
              px="34px"
            >
              Submit
            </Button>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
};

export default index;
