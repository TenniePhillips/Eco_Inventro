/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import {
  Avatar,
  Box,
  Flex,
  Icon,
  Image,
  Spacer,
  Text,
  Menu as Menu2,
  MenuButton as MenuButton2,
  MenuList as MenuList2,
  MenuItem as MenuItem2,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsLaptopFill } from "react-icons/bs";
import { PiArrowFatLineUpFill } from "react-icons/pi";
import { RiPieChart2Fill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { IoIosSettings, IoIosLogOut } from "react-icons/io";
const { Header, Content, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  let location = useRouter();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );

  const [name, setName] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    setSelectedMenuItem(router.asPath);
    if (typeof window !== "undefined") {
      const dt = window.sessionStorage.getItem("name") || null;
      const type = window.sessionStorage.getItem("type") || null;
      setName(dt);
      setUserType(type);
    }
  }, []);

  const menuArr = [
    {
      icon: BsLaptopFill,
      title: "Dashboard",
      route: "/dashboard",
    },
    {
      icon: PiArrowFatLineUpFill,
      title: "Inventory",
      route: "/inventory",
    },
    {
      icon: HiUserGroup,
      title: "Suppliers",
      route: "/suppliers",
    },
    {
      icon: RiPieChart2Fill,
      title: "Transactions",
      route: "/transactions",
    },
    {
      icon: IoIosSettings,
      title: "Settings",
      route: "/settings",
    },
  ];

  const userArr = [
    {
      icon: BsLaptopFill,
      title: "Dashboard",
      route: "/dashboard",
    },
    {
      icon: PiArrowFatLineUpFill,
      title: "Inventory",
      route: "/inventory",
    },
    {
      icon: HiUserGroup,
      title: "Suppliers",
      route: "/suppliers",
    },
    {
      icon: RiPieChart2Fill,
      title: "Transactions",
      route: "/transactions",
    },
  ];

  const userMenus = [];

  const router = useRouter();
  const [selectedMenuItem, setSelectedMenuItem] = React.useState("");

  return (
    <div className="div">
      <Header
        style={{
          position: "fixed",
          width: "100%",
          padding: "0px",
          height: "78px",
          zIndex: "10",
          backgroundColor: "#fff",
        }}
      >
        <Flex height="100%" justifyContent="end" alignItems="center">
          <Menu2>
            <MenuButton2>
              <Avatar size="sm" mt="14px" />
              <Box
                ml="10px"
                mr="50px"
                display="inline-block"
                fontSize="16px"
                fontWeight="600"
              >
                Hi {name}
              </Box>
            </MenuButton2>
            <MenuList2>
              <MenuItem2
                py="5px"
                px="20px"
                onClick={() => {
                  sessionStorage.clear();
                  router.push("/");
                }}
              >
                <IoIosLogOut size="20px" />{" "}
                <Box fontSize="16px" fontWeight="600" ml="10px">
                  Logout
                </Box>
              </MenuItem2>
            </MenuList2>
          </Menu2>
        </Flex>
      </Header>

      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          width={296}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            zIndex: "9999999999",
          }}
        >
          <Box
            height="60px"
            pt="24px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Box
              fontSize="24px"
              color="#fff"
              fontWeight="600"
              mb="0px"
              pb="0px"
            >
              Eco Inventro
            </Box>
          </Box>

          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" selectedKeys={[selectedMenuItem]}>
            {(userType == "admin" ? menuArr : userArr).map((item, index) => (
              <Menu.Item
                style={{
                  fontSize: 16,
                  marginTop: "25px",
                  marginBottom: "25px",
                }}
                icon={
                  <Icon
                    as={item.icon}
                    color="#fff"
                    boxSize="45px"
                    padding="14px"
                    size="16px"
                  />
                }
                key={item.route}
              >
                <Link href={item.route}>{item.title}</Link>
              </Menu.Item>
            ))}
          </Menu>
          <Spacer />
        </Sider>

        <Layout style={{ marginLeft: 296, padding: "20px" }}>
          <Content style={{ paddingTop: "80px" }}>{children}</Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default DashboardLayout;
