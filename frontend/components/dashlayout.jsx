/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { Avatar, Box, Flex, Icon, Image, Spacer, Text } from "@chakra-ui/react";
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
      icon: BiSolidUserAccount,
      title: "Settings",
      route: "/settings",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    setSelectedMenuItem(router.asPath);
  }, []);

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
          <Avatar size="sm" />
          <Box ml="20px" mr="50px" fontSize="16px" fontWeight="600">
            Hi Admin
          </Box>
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
            {/* <Image
              src="/images/recycle.png"
              height="34px"
              width="34px"
              alt="recycle"
              mr="10px"
            /> */}
            <Box
              fontSize="24px"
              color="#fff"
              fontWeight="600"
              mb="0px"
              pb="0px"
            >
              Inventro
            </Box>
          </Box>

          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" selectedKeys={[selectedMenuItem]}>
            {menuArr.map((item, index) => (
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
                    size="14px"
                    // mr="12px"
                  />
                }
                key={item.route}
              >
                <Link href={item.route}>{item.title}</Link>
              </Menu.Item>
            ))}
            {/* <SubMenu
              key="sub1"
              style={{
                fontSize: 16,
                marginTop: "20px",
                marginBottom: "20px",
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
            </SubMenu> */}
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
