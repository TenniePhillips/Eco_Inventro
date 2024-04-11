import React from "react";
import DashboardLayout from "../../components/dashlayout";
import {
  Box,
  Grid,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Icon,
  Flex,
  Button,
  Link,
} from "@chakra-ui/react";
import { FaBiohazard, FaRecycle, FaUsers } from "react-icons/fa";
import { MdDeliveryDining, MdFactory, MdInventory } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";
import InventryTable from "../../components/dashoboard_comps/inventry_table";
import SuppliersTable from "../../components/dashoboard_comps/suppliers_table";

const index = () => {
  const size = 24;

  const color = "rgba(41, 156, 219)";

  const dahsboardData = [
    {
      icon: <FaUsers size={size} color={color} />,
      title: "Users",
      total: 20,
      sub: "",
    },
    {
      icon: <MdInventory size={size} color={color} />,
      title: "Inventory",
      total: 40,
      sub: "",
    },
    {
      icon: <FaBiohazard size={size} color={color} />,
      title: "Carbon Footprint",
      total: "5000",
      sub: "kg",
    },
    {
      icon: <FaRecycle size={size} color={color} />,
      title: "Recycled",
      total: 200,
      sub: "",
    },
    {
      icon: <MdFactory size={size} color={color} />,
      title: "Suppliers",
      total: 55,
      sub: "",
    },
    {
      icon: <MdDeliveryDining size={size} color={color} />,
      title: "Pending Delivery",
      total: 200,
      sub: "",
    },
    {
      icon: <RiMailSendFill size={size} color={color} />,
      title: "Total Delivered",
      total: 20,
      sub: "",
    },
  ];

  return (
    <DashboardLayout>
      <Flex justifyContent="space-between" my="34px">
        <Text fontSize="24px" fontWeight="700">
          Dashboard
        </Text>{" "}
        <Button colorScheme="blue">Add Inventory</Button>
      </Flex>
      <Grid
        templateColumns="repeat(4, 1fr)" // Two columns with equal width
        gap={4} // Gap between grid items
      >
        {dahsboardData.map((item, id) => (
          <Box key={id}>
            <Card>
              <CardBody px="20px" py="24px">
                <Flex justifyContent="space-between">
                  <Box>
                    <Text
                      fontSize="32px"
                      fontWeight="800"
                      mb="0px"
                      color="#495057"
                    >
                      {item.total}
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "600",
                        }}
                      >
                        {item.sub}
                      </span>
                    </Text>
                    <Text
                      fontSize="16px"
                      fontWeight="500"
                      color="#878a99"
                      mb="20px"
                    >
                      {item.title}
                    </Text>
                    <Link fontSize="14px" href="">
                      See more
                    </Link>
                  </Box>

                  <Box
                    height="60px"
                    width="60px"
                    bg="#dff0fa"
                    borderRadius="10px"
                    // p="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {item.icon}
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          </Box>
        ))}
      </Grid>

      <Box mt="32px" mb="50px">
        <Grid
          templateColumns="repeat(2, 1fr)" // Two columns with equal width
          gap={4} // Gap between grid items
        >
          <InventryTable />
          <SuppliersTable />
        </Grid>
      </Box>
    </DashboardLayout>
  );
};

export default index;
