"use client";
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
} from "@chakra-ui/react";
import { MdDeliveryDining, MdFactory, MdInventory } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
  BarChart,
  Bar,
  Rectangle,
  PieChart,
  Pie,
  Cell,
  Sector,
  Legend,
} from "recharts";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;
import { FaCalculator } from "react-icons/fa6";
import CaculatorModal from "../../components/modal/calculator_modal";
import DahsboardBarChart from "../../components/dashoboard_comps/barChart";
import DashboardPieChart from "../../components/dashoboard_comps/pieChart";
import DahsboardLineChart from "../../components/dashoboard_comps/lineChart";

const index = () => {
  const size = 24;

  const color = "#027f82";
  // "rgba(41, 156, 219)";
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dahsboardData = [
    {
      icon: <MdInventory size={size} color={color} />,
      title: "Inventory",
      total: 40,
      sub: "",
    },

    {
      icon: <MdFactory size={size} color={color} />,
      title: "Suppliers",
      total: 55,
      sub: "",
    },

    {
      icon: <RiMailSendFill size={size} color={color} />,
      title: "Total Delivered",
      total: 20,
      sub: "",
    },
  ];

  // const CustomTooltip = ({ active, payload, label }) => {
  //   if (active && payload && payload.length) {
  //     let pData = payload[0]?.payload;
  //     return (
  //       <Box
  //         p=" 4px 18px"
  //         background="#ffff"
  //         boxShadow="0px 12.21240234375px 29.30976676940918px 0px #F2F2F240"
  //         borderRadius="7px"
  //         border="1.22px solid #CCCCCC"
  //       >
  //         <Text fontWeight="bold" fontSize="13px" textAlign="center">
  //           {pData.value}
  //         </Text>
  //       </Box>
  //     );
  //   }

  //   return null;
  // };

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

        <Card onClick={onOpen}>
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

      <Flex mt="32px" mb="50px" flexDir={{ base: "column", lg: "row" }} gap={3}>
        <DahsboardBarChart />
        <DashboardPieChart />
      </Flex>
      <Flex mt="32px" mb="50px" flexDir={{ base: "column", lg: "row" }} gap={3}>
        <Box width="60%">
          <DahsboardLineChart />
        </Box>
        <Box width="40%"></Box>
      </Flex>
      <CaculatorModal isOpen={isOpen} onClose={onClose} />
    </DashboardLayout>
  );
};

const renderActiveShape = (props) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-1} fontSize={11} textAnchor="middle" fill={fill}>
        {payload?.name}
      </text>
      <text
        x={cx}
        y={cy}
        dy={15}
        fontWeight="bold"
        fontSize={14}
        textAnchor="middle"
        fill={fill}
      >
        {payload?.value || "0"}%
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius - 4}
        outerRadius={outerRadius + 4}
        fill={fill}
      />
    </g>
  );
};
const styles = {
  container: {
    background: "#fff",
    borderRadius: "10px",
    border: "1px solid #E5EBF0",
    boxShadow: "0px 1px 0px rgba(63, 63, 68, 0.05)",
  },
  filterCont: {
    border: " 1px solid #E5EBF0",
    borderRadius: "4px",
    color: "#2D4047",
    paddingLeft: "34px",
    fontSize: "14px",
  },
  filterBox: {
    border: " 1px solid #E5EBF0",
    borderRadius: "4px",
    color: "#2D4047",
    paddingLeft: "34px",
    fontSize: "14px",
  },
  filterItem: {
    height: "28px",
    fontSize: "12p,x",
    borderRadius: "0,px",
    border: "none",
  },
  txtBold: {
    color: "#333346",
    fontWeight: "600",
  },
  cardTotal: {
    padding: "15px",
    borderRadius: "12px",
    backgroundColor: "#EBF4FF",
    border: "1px solid #E5EBF0",
    alignItems: "center",
  },
  card: {
    padding: "15px",
    borderRadius: "12px",
    backgroundColor: "#fff",
    border: "1px solid #E5EBF0",
    alignItems: "center",
    txt: {
      color: " #121F3E",
      fontSize: "12px",
      marginBottom: "2px",
    },
    txtBold: {
      color: "#121F3E",
      fontSize: "16px",
      fontWeight: "700",
    },
  },
};

export default index;
