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
          description: req.message,
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

  useEffect(() => {
    getOverview();
    // getMartialChart();
  }, []);

  const dahsboardData = [
    {
      icon: <MdInventory size={size} color={color} />,
      title: "Inventory",
      total: chartTotal.totalInventory,
      sub: "",
    },

    {
      icon: <MdFactory size={size} color={color} />,
      title: "Suppliers",
      total: chartTotal.totalSuppliers,
      sub: "",
    },

    {
      icon: <RiMailSendFill size={size} color={color} />,
      title: "Total Transactions",
      total: chartTotal.totalTransactions,
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
            <Card>
              <CardBody px="20px" py="24px">
                <Flex justifyContent="space-between">
                  <Box>
                    <Text
                      fontSize="32px"
                      fontWeight="800"
                      mb="0px"
                      color="#495057"
                    >
                      {item.total}
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {item.sub}
                      </span>
                    </Text>
                    <Text
                      fontSize="16px"
                      fontWeight="500"
                      color="#878a99"
                      mb="20px"
                    >
                      {item.title}
                    </Text>
                    <Link fontSize="14px" href="">
                      See more
                    </Link>
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
                <Text fontSize="32px" fontWeight="800" mb="0px" color="#495057">
                  Calculator
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
                  mb="20px"
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
