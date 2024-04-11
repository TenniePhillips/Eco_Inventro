import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { dashboardUserData } from "../data/dashboard_data";
import { Table } from "antd";

const SuppliersTable = () => {
  const columns = [
    {
      title: "Name",
      render: (item) => (
        <Flex alignItems="center">
          <Avatar size="sm" />
          <Box ml="10px">
            <Box fontWeight="600">{item.name}</Box>
            <Box>{item.date}</Box>
          </Box>
        </Flex>
      ),
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  return (
    <Box bg="#fff" borderRadius="10px">
      <Text pt="20px" pb="5px" px="24px" fontSize="18px" fontWeight="700">
        Recent Suppliers
      </Text>
      <Table
        className="custom-table"
        dataSource={dashboardUserData}
        columns={columns}
        pagination={false}
      />
    </Box>
  );
};

export default SuppliersTable;
