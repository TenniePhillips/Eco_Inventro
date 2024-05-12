"use client";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Text, Card, CardHeader, CardBody, useToast } from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Area,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   Rectangle,
//   PieChart,
//   Pie,
//   Cell,
//   Sector,
//   Legend,
// } from "recharts";
import { DatePicker, Space } from "antd";
import { HandleAllRequest } from "../../tools/request_handler";
const { RangePicker } = DatePicker;

const DahsboardLineChart = () => {
  const transformDataForRecharts = (data) => {
    const foo = data.map(({ materials, date }) => {
      const transformedMaterials = materials.reduce(
        (acc, { material, total }) => {
          acc[material.toLowerCase()] = total;
          return acc;
        },
        {}
      );

      return {
        name: date,
        ...transformedMaterials,
      };
    });

    setTransformedData(foo);
  };

  const [transformedData, setTransformedData] = useState([]);

  const toast = useToast();

  const [data, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecycled = async () => {
    setLoading(true);
    try {
      var req = await HandleAllRequest("/transaction/recycled", "get", "", {});

      setLoading(false);
      if (req.success == true) {
        const data = req.data;
        // setChartData(data);
        transformDataForRecharts(data);
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
    getRecycled();
  }, []);

  return (
    <Card w="100%">
      <CardHeader
        borderBottom=" 1px solid rgba(63, 63, 68, 0.005);
          box-shadow: 0px 1px 0px rgba(63, 63, 68, 0.05)"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="20px" fontWeight="600" mb="0px">
          Material Chart
        </Text>
        <RangePicker />
      </CardHeader>
      <CardBody>
        <ResponsiveContainer height={400} width="100%">
          {/* transformedData */}
          <BarChart
            width="100%"
            height={300}
            data={transformedData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="plastic" fill="#09E82E" />
            <Bar yAxisId="right" dataKey="styrofoam" fill="#EBF400" />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

// "#09E82E", "#EBF400",

const getColor = (material) => {
  switch (material) {
    case "Plastic":
      return "#8884d8";
    case "Styrofoam":
      return "#82ca9d";
    default:
      return "#000000";
  }
};

export default DahsboardLineChart;
