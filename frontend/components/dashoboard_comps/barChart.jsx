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
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  Pie,
} from "recharts";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const DahsboardBarChart = () => {
  const CustomXAxis = ({ x, y, stroke, payload }) => {
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

  const barData = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
          Waste generation chart
        </Text>
        <RangePicker />
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width="100%"
            height={300}
            data={barData}
            margin={{
              top: 15,
              right: 0,
              left: 0,
              bottom: -10,
            }}
          >
            <XAxis tick={<CustomXAxis />} dataKey="name" />
            <YAxis />
            <Bar
              maxBarSize={40}
              radius={[6, 6, 0, 0]}
              dataKey="uv"
              fill="#0E3EC6"
            />
            <Bar
              maxBarSize={40}
              radius={[6, 6, 0, 0]}
              dataKey="amt"
              fill="#09E82E"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default DahsboardBarChart;
