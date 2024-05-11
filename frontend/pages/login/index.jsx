import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Image,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HandleAllRequest } from "../../tools/request_handler";
// import useSuccessToast from "../../tools/successToast";
// import { useSuccessToast } from "../../tools/helpers";

const Index = () => {
  const router = useRouter();

  const [userData, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.sessionStorage.clear();
  }, []);

  const handleChange = (e) => {
    setData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const setAllData = (req) => {
    sessionStorage.clear();
    sessionStorage.setItem("name", req.data.name);
    sessionStorage.setItem("token", req.token);
    sessionStorage.setItem("type", req.data.userType);
    sessionStorage.setItem("email", req.data.email);
  };

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    var req = await HandleAllRequest("/user/login", "post", "", {
      email: userData.email,
      password: userData.password,
    });

    setLoading(false);
    if (req?.success == true) {
      console.log("data", req);
      setAllData(req);
      router.push("/dashboard");
      toast({
        position: "bottom-right",
        description: req?.message ?? "Success",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        position: "bottom-right",
        description: req?.message ?? "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log("error", e.message);
    }
  };

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
                height="90px"
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
              Eco Inventro
            </Text>
            <Text fontSize="26px" fontWeight="700" mb="10px" color="#000">
              Login
            </Text>
            <Text fontSize="18px" fontWeight="500" color="GrayText">
              Enter login credentials to continue
            </Text>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Email"
                mb="10px"
                size="md"
                name="email"
                required
                onChange={handleChange}
              />
              <Input
                placeholder="Password"
                mb="30px"
                size="md"
                name="password"
                type="password"
                required
                onChange={handleChange}
              />
              <Button
                isLoading={loading}
                mt="20px"
                height="52px"
                colorScheme="teal"
                width="100%"
                type="submit"
                py="20px"
                px="34px"
              >
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </Box>
    </Box>
  );
};

export default Index;
