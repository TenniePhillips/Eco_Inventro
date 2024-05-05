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
  useToast,
} from "@chakra-ui/react";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Pie,
  Tooltip,
  Legend,
} from "recharts";
import { DatePicker, Space } from "antd";
import { HandleAllRequest } from "../../tools/request_handler";
const { RangePicker } = DatePicker;

const DahsboardBarChart = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [chartData, setChartData] = useState([]);

  const CustomXAxis = ({ x, y, stroke, payload }) => {
    // console.log("payload", payload);
    return (
      <g transform={`translate(${x},${y})`}>
        <text
          x={0}
          y={0}
          dy={10}
          textAnchor="middle"
          fill="#2C2C2C"
          fontWeight={700}
        >
          {payload?.value}
        </text>
      </g>
    );
  };

  const getDailyTransaction = async () => {
    setLoading(true);
    try {
      var req = await HandleAllRequest(
        "/transaction/sum_transaction",
        "get",
        "",
        {}
      );

      setLoading(false);
      if (req.success == true) {
        const data = req.data;
        setChartData(data);
        // formatChartData(data);
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

  useEffect(() => {
    getDailyTransaction();
  }, []);

  const colors = ["#09E82E", "#EBF400", "#0E3EC6"];

  // const barData = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];

  // const formatChartData = (data) => {
  //   const newData = [];
  //   chartData.forEach((entry) => {
  //     entry.data.forEach((item) => {
  //       const existingEntry = newData.find(
  //         (chartEntry) => chartEntry.material === item.material
  //       );
  //       if (existingEntry) {
  //         existingEntry[entry.date] = parseInt(item.value);
  //       } else {
  //         const newEntry = {
  //           material: item.material,
  //           [entry.date]: parseInt(item.value),
  //         };
  //         newData.push(newEntry);
  //       }
  //     });
  //   });
  //   // setChartData(newData);
  //   return newData;
  // };

  return (
    <Card w={{ base: "100%", lg: "70%" }}>
      <CardHeader
        display="flex"
        borderBottom=" 1px solid rgba(63, 63, 68, 0.005);
                box-shadow: 0px 1px 0px rgba(63, 63, 68, 0.05)"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="20px" fontWeight="600" mb="0px">
          Daily Transaction chart
        </Text>
        <RangePicker />
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width="100%"
            height={300}
            data={chartData}
            margin={{
              top: 15,
              right: 0,
              left: 0,
              bottom: -10,
            }}
          >
            <Tooltip />
            <Legend />
            <XAxis tick={<CustomXAxis />} dataKey="date" />
            <YAxis />
            <Bar key="date" dataKey="total" fill="#09E82E" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default DahsboardBarChart;
