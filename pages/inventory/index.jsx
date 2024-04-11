/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import {
  Box,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { Table } from "antd";
import { RiMore2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/dashlayout";
import { ICON_CONST } from "../../components/constants";
import AddInventryModal from "../../components/modal/add_inventry";

const index = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dataSource = [
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      supplier: "ADC & co",
      measurement: "KG",
      type: "Polystyrene",
      quantity: "50",
      delivery: "12/04/2024",
      disposal: "Recycle",
      carbon: "0.50kg",
      requested: "9/04/2024",
    },
  ];

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
    {
      title: "Carbon Footprint",
      dataIndex: "carbon",
      key: "carbon",
    },
    {
      title: "Disposal Method",
      dataIndex: "disposal",
      key: "disposal",
    },
    {
      title: "Action",
      render: () => (
        <Menu isLazy>
          <MenuButton>
            <RiMore2Fill />
          </MenuButton>
          <MenuList>
            {menuArr.map((item, id) => (
              <MenuItem p="20px" key={id}>
                <Flex
                  onClick={() => router.push(`/users/${id}`)}
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <Box>{item.text}</Box>
                  <Icon as={item.img} size="32px" />
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ),
    },
  ];

  const menuArr = [
    {
      text: "Delete",
      img: ICON_CONST.deleteIcon,
      route: "",
    },
  ];

  return (
    <DashboardLayout>
      <Box p="20px" borderRadius="10px" bg="#fff">
        <Flex justifyContent="end" my="34px">
          <Button onClick={onOpen} colorScheme="blue">
            Add Inventory
          </Button>
        </Flex>

        <Table
          className="custom-table"
          dataSource={dataSource}
          columns={columns}
        />
      </Box>

      <AddInventryModal isOpen={isOpen} onClose={onClose} />
    </DashboardLayout>
  );
};

export default index;
