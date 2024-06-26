/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/dashlayout";
import {
  Box,
  Grid,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  Flex,
  Button,
  Link,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdFactory, MdInventory } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";
import { FaCalculator } from "react-icons/fa6";
import CaculatorModal from "../../components/modal/calculator_modal";
import DahsboardBarChart from "../../components/dashoboard_comps/barChart";
import DashboardPieChart from "../../components/dashoboard_comps/pieChart";
import DahsboardLineChart from "../../components/dashoboard_comps/lineChart";
import DahsboardMultiChart from "../../components/dashoboard_comps/multiChart";
import { HandleAllRequest } from "../../tools/request_handler";
import { useRouter } from "next/router";

const Index = () => {
  const size = 24;

  const color = "#027f82";

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const [chartTotal, setChartTotal] = useState({
    totalInventory: 0,
    totalTransactions: 0,
    totalSuppliers: 0,
  });

  const [loading, setLoading] = useState(false);

  const getOverview = async () => {
    setLoading(true);
    try {
      var req = await HandleAllRequest("/metrics/overview", "get", "", {});

      setLoading(false);
      if (req.success == true) {
        const data = req.data;
        console.log("data", data);
        setChartTotal({
          ...chartTotal,
          totalInventory: data.totalInventory ?? 0,
          totalSuppliers: data.totalSupplier ?? 0,
          totalTransactions: data.totalTransaction ?? 0,
        });
      } else {
        toast({
          position: "bottom-right",
          description: req?.message ?? "No Data",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        position: "bottom-right",
        description: error.message ?? "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const [summary, setSummary] = useState({
    plastic: 0,
    styrofoam: 0,
  });

  const getSummary = async () => {
    setLoading(true);
    try {
      var req = await HandleAllRequest(
        "/inventory/check_delivered",
        "get",
        "",
        {}
      );

      setLoading(false);
      if (req.success == true) {
        const data = req.data;
        console.log("summary data", data);
        setSummary({
          ...summary,
          plastic: Number(data?.Plastic) * 0.35 ?? 0,
          styrofoam: Number(data?.Styrofoam) * 0.65 ?? 0,
        });

        // setChartTotal({
        //   ...chartTotal,
        //   totalInventory: data.totalInventory ?? 0,
        //   totalSuppliers: data.totalSupplier ?? 0,
        //   totalTransactions: data.totalTransaction ?? 0,
        // });
      } else {
        // toast({
        //   position: "bottom-right",
        //   description: req?.message ?? "No Data",
        //   status: "error",
        //   duration: 5000,
        //   isClosable: true,
        // });
      }
    } catch (error) {
      // toast({
      //   position: "bottom-right",
      //   description: error.message ?? "Error",
      //   status: "error",
      //   duration: 5000,
      //   isClosable: true,
      // });
    }
  };

  useEffect(() => {
    getOverview();
    getSummary();
    // getMartialChart();
  }, []);

  const dahsboardData = [
    {
      icon: <MdInventory size={size} color={color} />,
      title: "Volume Of Waste",
      total: summary?.plastic ? summary?.plastic?.toFixed(2) : 0,
      sub: "Plastic",
    },

    {
      icon: <MdFactory size={size} color={color} />,
      title: "Volume Of Waste",
      total: summary?.styrofoam ? summary?.styrofoam?.toFixed(2) : 0,
      sub: "Styrofoam",
    },

    {
      icon: <RiMailSendFill size={size} color={color} />,
      title: "Total Transactions",
      total: chartTotal.totalTransactions ?? 0,
      sub: "",
    },
  ];

  const router = useRouter();

  return (
    <DashboardLayout>
      <Flex
        justifyContent="space-between"
        mt="34px"
        mb={{ base: "20px", lg: "34px" }}
      >
        <Text fontSize="24px" fontWeight="700" mb="0px">
          Overview
        </Text>
      </Flex>
      <Grid
        templateColumns={{
          base: "reapeat(1,1fr)",
          md: "reapeat(2,1fr)",
          lg: "repeat(4, 1fr)",
        }} // Two columns with equal width
        gap={4} // Gap between grid items
      >
        {dahsboardData.map((item, id) => (
          <Box key={id}>
            <Card height="100%">
              <CardBody px="20px" py="24px">
                <Flex justifyContent="space-between">
                  <Box>
                    <Box
                      fontSize="20px"
                      fontWeight="800"
                      mb="0px"
                      color="#495057"
                    >
                      {item.total}
                      {id < 2 ? (
                        <Box
                          as="span"
                          mr="10px"
                          fontSize="12px"
                          fontWeight="600"
                        >
                          KG
                        </Box>
                      ) : (
                        <Box></Box>
                      )}
                    </Box>
                    <Text
                      fontSize="14px"
                      fontWeight="500"
                      color="#878a99"
                      mb="16px"
                    >
                      {item.title}
                    </Text>

                    <Text mt="20px" mb="0px" fontSize="14px" fontWeight="600">
                      {item.sub}
                    </Text>
                  </Box>

                  <Box
                    height="60px"
                    width="60px"
                    bg="#dff0fa"
                    borderRadius="10px"
                    // p="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item.icon}
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          </Box>
        ))}

        <Card cursor="pointer" onClick={() => router.push("/calculator")}>
          <CardBody px="20px" py="24px">
            <Flex justifyContent="space-between">
              <Box>
                <Text fontSize="20px" fontWeight="800" mb="0px" color="#495057">
                  Impact <br /> Calculator
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                    }}
                  ></span>
                </Text>
                <Text
                  fontSize="16px"
                  fontWeight="500"
                  color="#878a99"
                  mb="5px"
                  mt="14px"
                >
                  Calculator pet, bottles etc
                </Text>
              </Box>

              <Box
                height="60px"
                width="60px"
                bg="#dff0fa"
                borderRadius="10px"
                // p="10px"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <FaCalculator size={size} color={color} />
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </Grid>

      <Box overflow="scroll">
        <Flex
          mt="32px"
          mb="50px"
          flexDir={{ base: "column", lg: "row" }}
          gap={3}
        >
          <DahsboardBarChart />
          <DashboardPieChart />
        </Flex>
        <Flex
          mt="32px"
          mb="50px"
          flexDir={{ base: "column", lg: "row" }}
          gap={3}
        >
          <Box width="50%">
            <DahsboardLineChart />
          </Box>
          <Box width="50%">
            <DahsboardMultiChart />
          </Box>
        </Flex>
      </Box>

      <CaculatorModal isOpen={isOpen} onClose={onClose} />
    </DashboardLayout>
  );
};

export default Index;
