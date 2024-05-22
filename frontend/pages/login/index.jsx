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
import useFcmToken from "../../tools/useFcmToken";

// import useSuccessToast from "../../tools/successToast";
// import { useSuccessToast } from "../../tools/helpers";

const Index = () => {
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

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
    window.sessionStorage.setItem("fcmToken", fcmToken) || null;
    sessionStorage.setItem("name", req.data.name);
    sessionStorage.setItem("token", req.token);
    sessionStorage.setItem("type", req.data.userType);
    sessionStorage.setItem("email", req.data.email);
  };

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var fcmToken;
    if (typeof window !== "undefined") {
      fcmToken = window.sessionStorage.getItem("fcmToken") || null;
    }
    setLoading(true);
    var req = await HandleAllRequest("/user/login", "post", "", {
      email: userData.email,
      password: userData.password,
      fcmToken,
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
      // zoom={{ base: "1", md: "0.9", lg: "1" }}
      minHeight="100%"
      display="flex"
      // flexDir="column"
      justifyContent="center"
      alignItems="center"
      bg="#319795"
    >
      <Box py={{ base: "24px", md: "28px", lg: "38px" }}>
        <Card
          maxWidth="480px"
          // style={{
          //   zoom: "0.8",
          // }}
        >
          <CardBody py="40px" px={{ base: "14px", lg: "32px" }}>
            <Flex justifyContent="center">
              <Image
                src="/images/eco.png"
                height="70px"
                alt="recycle"
                mr="10px"
              />
            </Flex>

            <Text
              textAlign="center"
              fontSize="24px"
              fontWeight="800"
              color="#000"
              mt="20px"
            >
              Eco Inventro
            </Text>
            <Text fontSize="18px" fontWeight="700" mb="10px" color="#000">
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
                mb="20px"
                size="md"
                name="password"
                type="password"
                required
                onChange={handleChange}
              />
              <Button
                isLoading={loading}
                mt="14px"
                height="48px"
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
