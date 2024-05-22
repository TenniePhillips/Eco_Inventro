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
import moment from "moment";
import { HandleAllRequest } from "../../tools/request_handler";
import { LoaderWidget } from "../../tools/helpers";

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
        console.log("recent inventory", data);
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      console.log("payload data ", payload[0]);
      var deliDate = moment(payload[0].payload.createdAt).format("DD-MM-YYYY");
      return (
        <Box
          p="4px 18px"
          pt="20px"
          background="#ffff"
          boxShadow="0px 12.21240234375px 29.30976676940918px 0px #F2F2F240"
          borderRadius="7px"
          border="1.22px solid #CCCCCC"
        >
          <Text className="label">{`Supplier: ${payload[0].payload.supplier.name}`}</Text>
          <Text className="intro">{`Quantity: ${payload[0].value}`}</Text>
          <Text className="intro">{`Created: ${deliDate}`}</Text>
        </Box>
      );
    }

    return null;
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
        {/* <RangePicker /> */}
      </CardHeader>
      <CardBody>
        {loading || chartData.length == 0 ? (
          <LoaderWidget loading={loading} height="400px" />
        ) : (
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
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(255, 255, 255, 0.2)" }}
              />
              <Legend />
              <Bar dataKey="quantity" name="name" fill="#0E3EC6" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardBody>
    </Card>
  );
};

export default DahsboardMultiChart;

// export default class Example extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/s/bar-chart-stacked-by-sign-cbct8';

// }
