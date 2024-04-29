/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";

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
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { Table } from "antd";
import { RiMore2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/dashlayout";
import { ICON_CONST } from "../../components/constants";
import RegisterModal from "../../components/modal/add_user";

const category = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataSource = [
    {
      key: "1",
      name: "Plastic",
      measurement: "kg",
      carbon: "0.2kg",
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      render: () => (
        <Menu isLazy>
          <MenuButton>
            <RiMore2Fill />
          </MenuButton>
          <MenuList>
            <MenuItem p="20px" key={id}>
              <Flex
                // onClick={() => router.push(`/users/${id}`)}
                justifyContent="space-between"
                alignItems="center"
                w="100%"
              >
                <Box>Delete User</Box>
                <Icon as={ICON_CONST.deleteIcon} size="32px" />
              </Flex>
            </MenuItem>
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
          Settings
        </Text>

        <Box p="20px" borderRadius="10px" bg="#fff">
          <Flex justifyContent="space-between" alignItems="center" my="34px">
            <Text fontSize="24px" fontWeight="600" mb="0px">
              User Management
            </Text>
            <Button
              // onClick={onOpen}
              height="52px"
              colorScheme="teal"
              px="24px"
            >
              Add New User
            </Button>
          </Flex>
          <Table
            className="custom-table"
            dataSource={userData}
            columns={columns}
            loading={loading}
          />
        </Box>
      </Box>

      <RegisterModal
        isOpen={isOpen}
        onClose={onClose}
        callBack={() => console.log("e")}
      />
    </DashboardLayout>
  );
};

export default category;
