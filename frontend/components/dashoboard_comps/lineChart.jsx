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

const DahsboardLineChart = () => {
  const lineData = [
    { name: "Page A", uv: 4000 },
    { name: "Page B", uv: 3000 },
    { name: "Page C", uv: 2000 },
    { name: "Page D", uv: 2600 },
    { name: "Page E", uv: 1890 },
    { name: "Page F", uv: 2390 },
    { name: "Page G", uv: 3490 },
  ];

  return (
    <Card>
      <CardHeader
        borderBottom=" 1px solid rgba(63, 63, 68, 0.005);
          box-shadow: 0px 1px 0px rgba(63, 63, 68, 0.05)"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text fontSize="20px" fontWeight="600" mb="0px">
          Recycle chart
        </Text>
        <RangePicker />
      </CardHeader>
      <CardBody p="40px">
        <ResponsiveContainer height={400}>
          <LineChart
            width="100%"
            height={500}
            data={lineData}
            margin={{
              top: 15,
              right: 0,
              left: -10,
              bottom: -10,
            }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#0E3EC6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default DahsboardLineChart;
