"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Avatar, Box, Icon, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BsLaptopFill } from "react-icons/bs";
import { PiArrowFatLineUpFill } from "react-icons/pi";
import { RiPieChart2Fill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { BiSolidUserAccount } from "react-icons/bi";
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

const DashboardLayout = ({ children }) => {
  let location = useRouter();
  const [current, setCurrent] = useState(
    location.pathname === "/" || location.pathname === ""
      ? "/dashboard"
      : location.pathname
  );

  const menuArr = [
    {
      icon: BsLaptopFill,
      title: "Home",
      route: "/dashboard",
    },
    {
      icon: HiUserGroup,
      title: "Suppliers",
      route: "/suppliers",
    },
    {
      icon: PiArrowFatLineUpFill,
      title: "Inventory",
      route: "/inventory",
    },
    {
      icon: RiPieChart2Fill,
      title: "Metrics",
      route: "/metrics",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    setSelectedMenuItem(router.asPath);
  }, []);

  const [selectedMenuItem, setSelectedMenuItem] = React.useState("");

  // const handleMenuClick = (item) => {
  //   setSelectedMenuItem(item.route);
  // };

  return (
    // mainlayout
    <Layout style={{ minHeight: "100vh" }}>
      {/* sidebar */}
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
          {/* title */}
          <Box fontSize="16px" color="#fff" fontWeight="600" pb="10px">
            Inventro
          </Box>
        </Box>

        <Box py="32px" px="24px" display="flex" alignItems="center">
          {/* user login data */}
          <Avatar size="md" />
          <Box ml={["14px", "14px", "14px", "14px", "24px"]}>
            <Box fontSize="14px" fontWeight="400" color="#fff">
              Good Day
            </Box>
            <Box fontSize="16px" fontWeight="700" color="#04D87F" mb="0px">
              Admin
            </Box>
          </Box>
        </Box>

        <div className="demo-logo-vertical" />
        {/* menu routes  */}
        <Menu theme="dark" mode="inline" selectedKeys={[selectedMenuItem]}>
          {menuArr.map((item, index) => (
            <Menu.Item
              style={{
                fontSize: 16,
                marginTop: "20px",
                marginBottom: "20px",
                // padding: "10px",
              }}
              icon={
                <Icon
                  as={item.icon}
                  color="#fff"
                  boxSize="45px"
                  padding="10px"
                  size="18px"
                  mr="12px"
                />
              }
              key={item.route}
            >
              <Link href={item.route}>{item.title}</Link>
            </Menu.Item>
          ))}
          {/* settings menu routes */}
          <SubMenu
            key="sub1"
            style={{
              fontSize: 16,
              marginTop: "20px",
              marginBottom: "20px",
              // padding: "10px",
            }}
            icon={
              <Icon
                as={BiSolidUserAccount}
                color="#fff"
                boxSize="45px"
                padding="10px"
                size="18px"
                mr="12px"
              />
            }
            title="Settings"
          >
            <Menu.Item key="2">
              <Link href="/settings/category">Categories</Link>
            </Menu.Item>

            <Menu.Item key="3">
              <Link href="/settings/measurement">Measurement</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
        <Spacer />
      </Sider>
      <Layout>
        {/* header component  */}
        <Header style={{ padding: 0 }} />
        {/* page content  */}
        <Content
          style={{
            marginLeft: 296,
            padding: "20px 24px 0",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
