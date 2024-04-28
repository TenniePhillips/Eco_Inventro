/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

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
  useToast,
} from "@chakra-ui/react";
import { Table } from "antd";
import { RiMore2Fill } from "react-icons/ri";
import { useRouter } from "next/router";
import DashboardLayout from "../../components/dashlayout";
import { ICON_CONST } from "../../components/constants";
import AddInventryModal from "../../components/modal/add_inventry";
import { HandleAllRequest } from "../../tools/request_handler";

const index = () => {
  // const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [inventoryData, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const getInventory = async () => {
    setLoading(true);
    var req = await HandleAllRequest("/inventory/fetch", "get", "", {});

    setLoading(false);
    if (req.success == true) {
      setInventory(req.data);
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
  };

  const deleteInventory = async (id) => {
    console.log("id", id);
    setLoading(true);
    var req = await HandleAllRequest(
      `/inventory/delete/${id}`,
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
      getInventory();
      // setInventory(req.data);
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
  };

  useEffect(() => {
    getInventory();
  }, []);

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
      dataIndex: "material",
      key: "material",
    },
    {
      title: "Quantity",
      dataIndex: "quatity",
      key: "quatity",
    },
    {
      title: "Measurement",
      dataIndex: "measurement",
      key: "measurement",
    },
    {
      title: "Delivery Date",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: "Requested Date",
      dataIndex: "orderDate",
      key: "orderDate",
    },

    {
      title: "Action",
      render: (item, id) => (
        <Menu isLazy>
          <MenuButton>
            <RiMore2Fill />
          </MenuButton>
          <MenuList>
            {menuArr.map((items, id) => (
              <MenuItem p="20px" key={id}>
                <Flex
                  onClick={() => deleteInventory(item._id)}
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <Box>{items.text}</Box>
                  <Icon as={items.img} size="32px" />
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
        <Flex justifyContent="space-between" alignItems="center" my="34px">
          <Text fontSize="24px" fontWeight="600" mb="0px">
            Waste Recycle
          </Text>
          <Button onClick={onOpen} height="52px" colorScheme="teal" px="24px">
            Add Inventory
          </Button>
        </Flex>

        <Table
          className="custom-table"
          dataSource={inventoryData}
          columns={columns}
          loading={loading}
        />
      </Box>

      <AddInventryModal
        isOpen={isOpen}
        callBack={getInventory}
        onClose={onClose}
      />
    </DashboardLayout>
  );
};

export default index;
