/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Flex,
  Grid,
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
import DashboardLayout from "../../components/dashlayout";
import { ICON_CONST } from "../../components/constants";
import { HandleAllRequest } from "../../tools/request_handler";
import moment from "moment";
import AddTransactionModal from "../../components/modal/add_transaction";
import { GiFoam } from "react-icons/gi";
import { MdOutlineBiotech } from "react-icons/md";
import { FaBottleWater } from "react-icons/fa6";

const index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [materialOverview, setOverview] = useState({
    plastic: 0,
    styrofoam: 0,
    biodegradable: 0,
  });

  const fooData = [
    {
      icon: FaBottleWater,
      name: "Plastic",
      data: materialOverview.plastic,
    },
    {
      icon: GiFoam,
      name: "Styrofoam",
      data: materialOverview.styrofoam,
    },
    {
      icon: MdOutlineBiotech,
      name: "Biodegradable",
      data: materialOverview.biodegradable,
    },
  ];

  const getTransactions = async () => {
    setLoading(true);
    var req = await HandleAllRequest("/transaction/fetch", "get", "", {});
    setLoading(false);
    if (req.success == true) {
      setTransactionData(req.data);
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

  const getInventroyOverview = async () => {
    setLoading(true);
    try {
      var req = await HandleAllRequest(
        "/inventory/check-balance",
        "get",
        "",
        {}
      );
      setLoading(false);
      if (req.success == true) {
        // console.log("sum of material", req.data);
        const data = req.data;
        setOverview({
          ...materialOverview,
          plastic: data.plastic ?? 0,
          styrofoam: data?.styrofoam ?? 0,
          biodegradable: data.biodegradable ?? 0,
        });
        // setTransactionData(req.data);
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
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const deleteTransaction = async (id) => {
    console.log("id", id);
    setLoading(true);
    var req = await HandleAllRequest(
      `/transaction/delete/${id}`,
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
        getTransactions();
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
    getTransactions();
    getInventroyOverview();
  }, []);

  const columns = [
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
      title: "Action Type",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (item, id) => (
        <Box key={id}>
          {moment(item?.createdDate).format("DD-MM-YYYY") ?? "N/A"}
        </Box>
      ),
    },
    {
      title: "Action",
      render: (item, id) => (
        <Menu isLazy>
          <MenuButton>
            <RiMore2Fill />
          </MenuButton>
          {userType == "admin" && (
            <MenuList>
              {menuArr.map((items, id) => (
                <MenuItem p="20px" key={id}>
                  <Flex
                    onClick={() => deleteTransaction(item._id)}
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
          )}
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

  const [userType, setUserType] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const type = window.sessionStorage.getItem("type") || "user";
      setUserType(type);
    }
  }, []);

  return (
    <DashboardLayout>
      <Box p="20px" borderRadius="10px" bg="#fff">
        <Text fontSize="24px" fontWeight="600" mb="20px">
          Current Stock
        </Text>
        <Grid
          templateColumns={{
            base: "reapeat(1,1fr)",
            md: "reapeat(3,1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {fooData.map((item, id) => (
            <Box
              key={id}
              display="flex"
              p="20px"
              borderRadius="10px"
              bg="#dff0fa"
            >
              <Box
                height="50px"
                width="50px"
                borderRadius="50%"
                // backgroundColor="teal.300"
                bg="#fff"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr="10px"
              >
                <Icon as={item.icon} size="32px" boxSize={30} color="teal" />
              </Box>
              <Box>
                <Box
                  fontSize="14px"
                  fontWeight="700"
                  color="#00000078"
                  key={id}
                >
                  {item.name}
                </Box>
                <Box fontSize="18px" fontWeight="600">
                  {item.data}
                </Box>
              </Box>
            </Box>
          ))}
        </Grid>

        <Flex justifyContent="space-between" alignItems="center" my="34px">
          <Text fontSize="24px" fontWeight="600" mb="0px">
            Transaction History
          </Text>
          {userType == "admin" && (
            <Button onClick={onOpen} height="52px" colorScheme="teal" px="24px">
              Add Transaction
            </Button>
          )}
        </Flex>

        <Table
          className="custom-table"
          dataSource={transactionData}
          columns={columns}
          loading={loading}
        />
      </Box>

      <AddTransactionModal
        isOpen={isOpen}
        callBack={() => {
          getTransactions();
          getInventroyOverview();
        }}
        onClose={onClose}
        data={materialOverview}
      />
    </DashboardLayout>
  );
};

export default index;
