import {
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import DashboardLayout from "../../components/dashlayout";
import WasteGenCalculator from "../../components/waste_generation_calculator";
import LandifllCalculator from "../../components/landfill_calculator";
import SwitchingCalculator from "../../components/switching";

const index = () => {
  return (
    <DashboardLayout>
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
