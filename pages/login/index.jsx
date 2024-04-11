/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Button, Card, CardBody, Input, Text } from "@chakra-ui/react";
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
    >
      <Box width="580px" py="40px">
        <Card>
          <CardBody>
            <Text
              textAlign="center"
              fontSize="24px"
              fontWeight="600"
              color="#000"
            >
              Inventro
            </Text>
            <Text fontSize="24px" fontWeight="600" color="#000">
              Login
            </Text>
            <Text>Enter login credentials to continue</Text>
            <Input placeholder="Email" mb="10px" />
            <Input placeholder="Password" mb="30px" />
            <Button
              colorScheme="blue"
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
