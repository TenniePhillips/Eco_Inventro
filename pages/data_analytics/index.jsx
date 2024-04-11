import React from "react";
import DashboardLayout from "../../components/dashlayout";
import { Box, Grid, Text } from "@chakra-ui/react";
import * as Recharts from "recharts";
const {
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
} = Recharts;

const index = () => {
  const data = [
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
    <DashboardLayout>
      <Text fontSize="24px" fontWeight="700" my="24px">
        Data Analytics
      </Text>
      <Grid
        templateColumns="repeat(2, 1fr)" // Two columns with equal width
        gap={4} // Gap between grid items
      >
        <Box p="20px" bg="#fff">
          <Text>Suppliers Chart</Text>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={barData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis axisLine={false} dataKey="name" />
              <YAxis axisLine={false} />

              <Bar
                dataKey="pv"
                fill="#F7FFD7"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                fill="#0FFF9A"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
        <Box p="20px" bg="#fff">
          <Text>Suppliers Chart</Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid /> */}
              <XAxis axisLine={false} dataKey="name" />
              <YAxis axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="pv" fill="#0FFF9A" />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#0FFF9A"
                fill="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box p="20px" bg="#fff">
          <Text>Carbon Footprint</Text>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis axisLine={false} dataKey="name" />
              <YAxis axisLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="pv" fill="#0FFF9A" />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#0FFF9A"
                fill="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>

        <Box p="20px" bg="#fff">
          <Text>Inventory Type Chart</Text>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={500}
              height={300}
              data={barData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <XAxis axisLine={false} dataKey="name" />
              <YAxis axisLine={false} />

              <Bar
                dataKey="pv"
                fill="#F7FFD7"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
              <Bar
                dataKey="uv"
                fill="#0FFF9A"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </DashboardLayout>
  );
};

export default index;
