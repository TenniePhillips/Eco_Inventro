import { Box, Spinner, Text } from "@chakra-ui/react";
import { BsFolderFill } from "react-icons/bs";
import React from "react";

export const NumberFormat = ({ value }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "m";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    } else {
      return num;
    }
  };

  return <span>{formatNumber(value)}</span>;
};

export function formatNumber(number) {
  if (number >= 1e9) {
    return `${(number / 1e9).toFixed(2)}b`; // Billion
  } else if (number >= 1e6) {
    return `${(number / 1e6).toFixed(2)}m`; // Million
  } else if (number >= 1e3) {
    return `${(number / 1e3).toFixed(2)}k`; // Thousand
  } else {
    return number.toString();
  }
}

export function LoaderWidget({ loading, height }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={height}
      width="100%"
    >
      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal"
          size="xl"
        />
      ) : (
        <BsFolderFill size="130px" color="teal" />
      )}

      <Text fontSize="20px" fontWeight="500" mt="24px">
        {loading ? "Loading..." : "No Data"}
      </Text>
    </Box>
  );
}
