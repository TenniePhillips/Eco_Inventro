import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Box,
  UnorderedList,
  ListItem,
  Text,
  Heading,
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DashboardLayout from "../../components/dashlayout";
import WasteGenCalculator from "../../components/waste_generation_calculator";
import LandifllCalculator from "../../components/landfill_calculator";
// import SwitchingCalculator from "../../components/switching";

const index = () => {
  return (
    <DashboardLayout>
      <Card mb="24px">
        <CardBody>
          <Heading size="md" mb="20px">
            Waste Calculator
          </Heading>
          <Text fontSize="24px" fontWeight="600" mb="10px">
            Understand Your Impact
          </Text>
          <Text fontSize="18px">
            Use our Waste Calculator to gauge the environmental footprint of
            your food packaging waste. Simply input your current packaging type
            and average daily deliveries to see monthly and yearly waste totals.
            Compare these figures with biodegradable alternatives to make
            informed decisions about switching to more sustainable options.
          </Text>
          <Text fontSize="20px" fontWeight="600" mb="10px">
            Why Use This Tool?
          </Text>
          <UnorderedList>
            <ListItem fontSize="16px">
              <Box as="span" fontWeight="600">
                {" "}
                Assess and Monitor:{" "}
              </Box>
              Keep track of your waste levels to optimize reduction efforts
            </ListItem>
            <ListItem fontSize="16px">
              <Box as="span" fontWeight="600">
                {" "}
                Cost and Compliance:{" "}
              </Box>
              Save on disposal costs and meet environmental regulations more
              easily.
            </ListItem>
            <ListItem fontSize="16px">
              <Box as="span" fontWeight="600">
                {" "}
                Enhance Brand Image:{" "}
              </Box>
              Show your commitment to sustainability, aligning with the values
              of your customers.
            </ListItem>
          </UnorderedList>
        </CardBody>
      </Card>
      <VStack gap={4}>
        <Tabs position="relative" variant="unstyled" colorScheme="green">
          <TabList>
            <Tab>Waste Calculator</Tab>
            <Tab>GHG Calculator</Tab>
            {/* <Tab>Green Reduction</Tab> */}
          </TabList>
          <TabIndicator
            mt="-2.5px"
            height="4px"
            bg="teal"
            borderRadius="10px"
          />
          <TabPanels>
            <TabPanel>
              <WasteGenCalculator />
            </TabPanel>
            <TabPanel>
              <LandifllCalculator />
            </TabPanel>
            {/* <TabPanel>
              <SwitchingCalculator />
            </TabPanel> */}
          </TabPanels>
        </Tabs>
        {/* <WasteGenCalculator />
        <LandifllCalculator /> */}
      </VStack>
    </DashboardLayout>
  );
};

export default index;
