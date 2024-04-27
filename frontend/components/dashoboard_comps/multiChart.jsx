import React, { PureComponent } from "react";
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
const { RangePicker } = DatePicker;

const data = [
  {
    name: "Plastic",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Polysteryne",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Biodegrade",
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

const DahsboardMultiChart = () => {
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
          Weight of wastes
        </Text>
        <RangePicker />
      </CardHeader>
      <CardBody p="40px">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            width="100%"
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
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
