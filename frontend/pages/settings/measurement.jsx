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
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Table } from "antd";
import { RiMore2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/dashlayout";
import { ICON_CONST } from "../../components/constants";
import AddInventryModal from "../../components/modal/add_inventry";

const Measurement = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dataSource = [
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Grams",
      shortName: "g",
      base: "Kilograms",
      value: "1000",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Piece",
      shortName: "pc",
      base: "Piece",
      value: "1",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Grams",
      shortName: "g",
      base: "Kilograms",
      value: "1000",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Piece",
      shortName: "pc",
      base: "Piece",
      value: "1",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Short Name",
      dataIndex: "shortName",
      key: "shortName",
    },
    {
      title: "Base Unit",
      dataIndex: "base",
      key: "base",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
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
        <Text fontSize="24px" fontWeight="700">
          Measurement
        </Text>

        <Table
          className="custom-table"
          dataSource={dataSource}
          columns={columns}
        />
      </Box>
    </DashboardLayout>
  );
};

export default Measurement;
