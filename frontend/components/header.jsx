/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  Wrap,
} from "@chakra-ui/react";
import React from "react";

export const Header = () => {
  return (
    <Box w="100%" height="120px" borderBottom="1px solid #2A0A5C">
      <Box height="100%" className="custom-container">
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Text fontSize="36px" fontWeight="700" color="#000" mb="0px">
            Eco Inventro
          </Text>
          <Spacer />
        </Flex>
      </Box>
    </Box>
  );
};
