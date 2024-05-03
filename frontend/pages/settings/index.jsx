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
  useToast,
} from "@chakra-ui/react";
import { Table } from "antd";
import { RiMore2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/dashlayout";
import { ICON_CONST } from "../../components/constants";
import RegisterModal from "../../components/modal/add_user";
import { HandleAllRequest } from "../../tools/request_handler";

const Index = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const getUsers = async () => {
    setLoading(true);

    try {
      var req = await HandleAllRequest("/user/fetch", "get", "", {});

      setLoading(false);
      if (req.success == true) {
        setUserData(req.data);
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

  const deleteUser = async (id) => {
    setLoading(true);
    try {
      setLoading(false);
      var req = await HandleAllRequest(`/user/delete/${id}`, "delete", "", {});

      if (req.success == true) {
        toast({
          position: "bottom-right",
          description: req.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        getUsers();
      } else {
        toast({
          position: "bottom-right",
          description: req.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        console.log("error", req.message);
      }
    } catch (error) {
      console.log("error", error);
      toast({
        position: "bottom-right",
        description: error.message ?? "error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
      render: (item, id) => (
        <Menu isLazy>
          <MenuButton>
            <RiMore2Fill />
          </MenuButton>
          <MenuList>
            <MenuItem p="20px">
              <Flex
                onClick={() => deleteUser(item._id)}
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
            <Button onClick={onOpen} height="52px" colorScheme="teal" px="24px">
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

      <RegisterModal isOpen={isOpen} onClose={onClose} callBack={getUsers} />
    </DashboardLayout>
  );
};

export default Index;
