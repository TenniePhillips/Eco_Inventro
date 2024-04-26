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
  PieChart,
  Pie,
  Cell,
  Sector,
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
        Metrics
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
          <Flex>
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
          </Flex>
        </Box>
      </Grid>
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
