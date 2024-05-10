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
  Select,
  useToast,
} from "@chakra-ui/react";
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
import { MdCalendarMonth } from "react-icons/md";
import { HandleAllRequest } from "../../tools/request_handler";

const DashboardPieChart = () => {
  useEffect(() => {
    getMartialChart();
  }, []);

  const [pieChartData, setChartData] = useState({
    Plastic: 0,
    Styrofoam: 0,
    Biodegradable: 0,
  });
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const data = [
    { name: "Plastic", value: pieChartData?.Plastic ?? 0, color: "#0E3EC6" },
    {
      name: "Polystyrene",
      value: pieChartData?.Styrofoam ?? 0,
      color: "#09E82E",
    },
    {
      name: "Biodegradable",
      value: pieChartData?.Biodegradable ?? 0,
      color: "#EBF400",
    },
    // { name: "Styrofoam ", value: pieChartData?., color: "#EABE6C" },
  ];
  const getMartialChart = async () => {
    setLoading(true);
    try {
      var req = await HandleAllRequest(
        "/metrics/material_overview",
        "get",
        "",
        {}
      );

      setLoading(false);
      if (req.success == true) {
        const data = req.data;
        setChartData({
          ...pieChartData,
          Plastic: data[0]?.totalQuantity ?? 0,
          Styrofoam: data[2]?.totalQuantity ?? 0,
          Biodegradable: data[1]?.totalQuantity ?? 0,
        });
        console.log("data", data);
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      let pData = payload[0]?.payload;
      return (
        <Box
          p=" 4px 18px"
          background="#ffff"
          boxShadow="0px 12.21240234375px 29.30976676940918px 0px #F2F2F240"
          borderRadius="7px"
          border="1.22px solid #CCCCCC"
        >
          <Text fontWeight="bold" fontSize="13px" textAlign="center">
            {pData.value}
          </Text>
        </Box>
      );
    }

    return null;
  };

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const [activeIndex, setActiveIndex] = React.useState(0);

  return (
    <Card w={{ base: "100%", lg: "30%" }}>
      <CardHeader
        borderBottom=" 1px solid rgba(63, 63, 68, 0.005);
                box-shadow: 0px 1px 0px rgba(63, 63, 68, 0.05)"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="16px" fontWeight="600" mb="0px">
          Material Chart
        </Text>
        <Box h="30px" pos="relative">
          <Icon
            as={MdCalendarMonth}
            size="20px"
            pos="absolute"
            top="12px"
            right="12px"
          />
          <Select icon={<Box></Box>} width="140px">
            <option value="">Weekly</option>
            <option value="">Daily</option>
            <option value="">Monthly</option>
          </Select>
        </Box>
      </CardHeader>
      <CardBody>
        <Box width="100%" pt={{ base: "20px", lg: "20px" }} px="auto">
          <Flex pt="20px" justifyContent="center" alignItems="center">
            {data.map((d, i) => (
              <Flex key={i} mx="10px" alignItems="center">
                <Box
                  w="16px"
                  h="16px"
                  borderRadius="3px"
                  backgroundColor={d?.color}
                ></Box>
                <Text
                  fontSize="12px"
                  fontWeight="600"
                  ml="5px"
                  mb="0px"
                  textTransform="capitalize"
                >
                  {d?.name}
                </Text>
              </Flex>
            ))}
          </Flex>
          <Flex pt="20px" justifyContent="center" alignItems="center">
            <ResponsiveContainer height={340} width={300}>
              <PieChart
                width={240}
                height={200}
                style={{ marginRight: "auto", marginLeft: "auto" }}
              >
                <Pie
                  activeIndex={activeIndex}
                  activeShape={renderActiveShape}
                  onMouseEnter={onPieEnter}
                  data={data}
                  cx={150}
                  cy={150}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data?.map((entry, index) => (
                    <Cell fill={entry?.color} key={index} />
                  ))}
                </Pie>
                <Tooltip content={CustomTooltip} />
              </PieChart>
            </ResponsiveContainer>
          </Flex>
        </Box>
      </CardBody>
    </Card>
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
        {payload?.value || "0"}
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

export default DashboardPieChart;
