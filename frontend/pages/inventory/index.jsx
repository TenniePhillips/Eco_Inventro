/* eslint-disable react-hooks/rules-of-hooks */
"useClient";
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
import moment from "moment";
import EditInventryModal from "../../components/modal/update_status";
import { RiEdit2Line } from "react-icons/ri";

const index = () => {
  // const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    onClose: onStatusClose,
  } = useDisclosure();

  const [inventoryData, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const type = window.sessionStorage.getItem("type") || "user";
      setUserType(type);
    }
  }, []);

  // console.log("user", userType);

  const getInventory = async () => {
    setLoading(true);
    var req = await HandleAllRequest("/inventory/fetch", "get", "", {});
    setLoading(false);
    if (req?.success == true) {
      setInventory(req?.data ?? []);
    } else {
      toast({
        position: "bottom-right",
        description: req?.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.log("error", req?.message);
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
    try {
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
    } catch (error) {
      toast({
        position: "bottom-right",
        description: error.message ?? "",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
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

      key: "supplier",
      render: (item, id) => (
        <Box key={id}>{item?.supplier?.supplier ?? "N/A"}</Box>
      ),
    },
    {
      title: "Material Type",
      dataIndex: "material",
      key: "material",
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
      title: "Requested Date",
      render: (item, id) => (
        <Box key={id}>
          {moment(item?.orderDate).format("DD-MM-YYYY") ?? "N/A"}
        </Box>
      ),
    },
    {
      title: "Delivery Date",
      render: (item, id) => (
        <Box key={id}>
          {moment(item.deliveryDate).format("DD-MM-YYYY") ?? "N/A"}
        </Box>
      ),
    },
    {
      title: "Status",
      render: (item, id) => (
        <Box
          key={id}
          py="5px"
          px="10px"
          fontWeight="700"
          bg={item.status == "delivered" ? "teal.300" : "yellow.300"}
          display="inline"
          borderRadius="5px"
          color={item.status == "delivered" ? "teal.700" : "yellow.700"}
          textTransform="capitalize"
        >
          {item.status}
        </Box>
      ),
    },
    {
      title: "Action",
      render: (item, id) => (
        <Menu isLazy>
          <MenuButton p="10px">
            <RiMore2Fill size="20px" />
          </MenuButton>
          <MenuList>
            {menuArr.map((sub, id) => (
              <MenuItem p="20px" key={id}>
                <Flex
                  onClick={() => sub.action(item)}
                  justifyContent="space-between"
                  alignItems="center"
                  w="100%"
                >
                  <Box fontWeight="500">{sub.text}</Box>
                  <Icon as={sub.img} boxSize="24px" size="32px" />
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      ),
    },
  ];

  const [id, setId] = useState("");

  const menuArr = [
    {
      text: "Delete",
      img: ICON_CONST.deleteIcon,
      action: (item) => deleteInventory(item._id),
    },
    {
      text: "Update Status",
      img: RiEdit2Line,
      action: (item) => {
        console.log("");
        setId(item._id);
        onStatusOpen();
      },
    },
  ];

  return (
    <DashboardLayout>
      <Box p="20px" borderRadius="10px" bg="#fff">
        <Flex justifyContent="space-between" alignItems="center" my="34px">
          <Text fontSize="24px" fontWeight="600" mb="0px">
            Inventory Management
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
      <EditInventryModal
        isOpen={isStatusOpen}
        id={id}
        callBack={getInventory}
        onClose={onStatusClose}
      />
    </DashboardLayout>
  );
};

export default index;
