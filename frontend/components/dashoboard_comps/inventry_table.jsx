import React from "react";
import { Box, Menu, Text } from "@chakra-ui/react";
import { DashboardInventryData } from "../data/dashboard_data";
import { Table } from "antd";

const InventryTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "Material Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Measurement",
      dataIndex: "measurement",
      key: "measurement",
    },
    {
      title: "Delivery Date",
      dataIndex: "delivery",
      key: "delivery",
    },
    {
      title: "Requested Date",
      dataIndex: "requested",
      key: "requested",
    },
  ];

  return (
    <Box bg="#fff" borderRadius="10px">
      <Text pt="20px" pb="5px" px="24px" fontSize="18px" fontWeight="700">
        Recent Inventory
      </Text>
      <Table
        className="custom-table"
        dataSource={DashboardInventryData}
        columns={columns}
        pagination={false}
      />
    </Box>
  );
};

export default InventryTable;
