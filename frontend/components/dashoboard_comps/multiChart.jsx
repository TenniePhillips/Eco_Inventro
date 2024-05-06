import React, { useState, useEffect } from "react";
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
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { DatePicker, Space } from "antd";
import { HandleAllRequest } from "../../tools/request_handler";
const { RangePicker } = DatePicker;

// inventory/recent_inventory

const DahsboardMultiChart = () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const toast = useToast();

  const getRecentInventory = async () => {
    setLoading(true);
    try {
      var req = await HandleAllRequest(
        "/inventory/recent_inventory",
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

  const CustomXAxis = ({ x, y, stroke, payload }) => {
    console.log("payload", payload);
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

  useEffect(() => {
    getRecentInventory();
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
          Recent Inventory
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
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis tick={<CustomXAxis />} dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              key="name"
              dataKey="quantity" // This specifies the data property to be used as the value for the bar
              name="quantity" // This specifies the label for the bar
              fill="#0E3EC6"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};

export default DahsboardMultiChart;

// export default class Example extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/bar-chart-stacked-by-sign-cbct8';

// }
