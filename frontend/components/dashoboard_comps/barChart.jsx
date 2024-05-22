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
import { LoaderWidget } from "../../tools/helpers";
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
        `/transaction/sum_transaction`,
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

  const [date, setDate] = useState({
    startDate: "",
    endDate: "",
  });

  const getByDateTransaction = async () => {
    const { startDate, endDate } = date;
    setLoading(true);
    try {
      var req = await HandleAllRequest(
        `/transaction/sum_transaction?startDate=${startDate}&endDate=${endDate}`,
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

  const onDateChange = (dates, dateStrings) => {
    setDate({
      startDate: dateStrings[0],
      endDate: dateStrings[1],
    });
    console.log(date);
    getByDateTransaction();
  };

  console.log("date", date);

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
        <RangePicker onChange={onDateChange} />
      </CardHeader>
      <CardBody>
        {loading || chartData.length == 0 ? (
          <LoaderWidget loading={loading} height="300px" />
        ) : (
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
        )}
      </CardBody>
    </Card>
  );
};

export default DahsboardBarChart;
