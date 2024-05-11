/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";

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
  useToast,
} from "@chakra-ui/react";
import { Table } from "antd";
import { RiMore2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/dashlayout";
import { ICON_CONST } from "../../components/constants";
import AddSupplierModal from "../../components/modal/add_supplier";
import { HandleAllRequest } from "../../tools/request_handler";

const index = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [userType, setUserType] = useState("");

  useEffect(() => {
    getSuppplier();
    if (typeof window !== "undefined") {
      const type = window.sessionStorage.getItem("type") || "user";
      setUserType(type);
    }
  }, []);
  const [supplierDataData, setSupplierData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const getSuppplier = async () => {
    setLoading(true);
    var req = await HandleAllRequest("/supplier/fetch", "get", "", {});

    try {
      setLoading(false);
      if (req.success == true) {
        setLoading(false);
        setSupplierData(req.data);
      } else {
        setLoading(false);
        toast({
          position: "bottom-right",
          description: req.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        position: "bottom-right",
        description: error.message ?? "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteSupplier = async (id) => {
    setLoading(true);
    try {
      var req = await HandleAllRequest(
        `/supplier/delete/${id}`,
        "delete",
        "",
        {}
      );
      setLoading(false);
      if (req.success == true) {
        toast({
          position: "bottom-right",
          description: req.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        getSuppplier();
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
      setLoading(false);
      toast({
        position: "bottom-right",
        description: error.message ?? "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
      dataIndex: "paymentType",
      key: "paymentType",
    },

    {
      title: "Action",
      render: (item, id) => (
        <Menu isLazy>
          <MenuButton p="10px">
            <RiMore2Fill size="20px" />
          </MenuButton>

          <MenuList>
            <MenuItem p="20px">
              <Flex
                onClick={() => deleteSupplier(item._id)}
                justifyContent="space-between"
                alignItems="center"
                w="100%"
              >
                <Box fontWeight="500">Delete</Box>
                <Icon as={ICON_CONST.deleteIcon} boxSize="24px" size="32px" />
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
          dataSource={supplierDataData}
          columns={columns}
          loading={loading}
        />
      </Box>

      <AddSupplierModal
        isOpen={isOpen}
        onClose={onClose}
        callBack={getSuppplier}
      />
    </DashboardLayout>
  );
};

export default index;
