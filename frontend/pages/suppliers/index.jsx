/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import {
  Avatar,
  Box,
  Button,
  Flex,
  Icon,
  Image,
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
import AddSupplierModal from "../../components/modal/add_supplier";

const index = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dataSource = [
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
    {
      key: "1",
      //   date: "Jan 13, 2024",
      name: "Mike Adenuga",
      email: "johndoe@gmail.com",
      phone: "0705444444444",
      supplier: "ADC & co",
      website: "ADC.com.ng",
      payment: "Bank Transfer",
      address: "1 queens avenue, london",
    },
  ];

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
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Payment Option",
      dataIndex: "payment",
      key: "payment",
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
    // {
    //   text: "Activate",
    //   img: ImageConst.activate,
    //   route: "",
    // },
    // {
    //   text: "Deactivate",
    //   img: ImageConst.deactivate,
    //   route: "",
    // },
    {
      text: "Delete",
      img: ICON_CONST.deleteIcon,
      route: "",
    },
    {
      text: "View",
      img: ICON_CONST.viewIcon,
      route: "",
    },
  ];

  const info = [
    {
      title: "Users",
      total: "20k",
    },
    {
      title: "Approved",
      total: "1000",
    },
    {
      title: "Pending",
      total: "2340",
    },
  ];

  return (
    <DashboardLayout>
      <Box p="20px" borderRadius="10px" bg="#fff">
        <Flex justifyContent="space-between" alignItems="center" my="34px">
          <Text fontSize="24px" fontWeight="600" mb="0px">
            Supplier Management
          </Text>
          <Button onClick={onOpen} height="52px" colorScheme="teal" px="24px">
            Add Supplier
          </Button>
        </Flex>

        <Table
          className="custom-table"
          dataSource={dataSource}
          columns={columns}
        />
      </Box>

      <AddSupplierModal isOpen={isOpen} onClose={onClose} />
    </DashboardLayout>
  );
};

export default index;
