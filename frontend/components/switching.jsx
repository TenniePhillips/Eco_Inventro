import {
  Grid,
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
  Card,
  CardHeader,
  CardBody,
  Box,
  Text,
  Heading,
  Divider,
  Flex,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GiEcology } from "react-icons/gi";
import { LuLeafyGreen } from "react-icons/lu";

const SwitchingCalculator = () => {
  const [wasteData, setWasteData] = useState({
    plastic: 0,
    styrofoam: 0,
    percentage: 0,
  });

  console.log("wasteData", wasteData);

  const [wasteTotal, setWasteTotal] = useState(0);
  const [landfillReduction, setLandfillReduction] = useState(0);

  const handleChange = (e) => {
    setWasteData({
      ...wasteData,
      [e.target.name]: e.target.value,
    });

    setWasteTotal(0);
  };

  const plasticGhG = 4;
  const styrofoamGhG = 6;
  const bioGHG = 1.5;

  const calculateData = (e) => {
    e.preventDefault();
    const { plastic, styrofoam, percentage } = wasteData;

    if (plastic > 0 || styrofoam) {
      const plasticTotal = Number(plastic) * plasticGhG;
      const styrofoamTotal = Number(styrofoam) * styrofoamGhG;

      const volumeTotal = plasticTotal + styrofoamTotal;

      const bioVal = bioGHG * (Number(plastic) + Number(styrofoam));

      const reduction = (Number(volumeTotal) - bioVal) * 0.2;

      const landfill =
        (Number(plastic) + Number(styrofoam)) * (Number(percentage) / 100);

      // console.log("reduction", reduction);
      setLandfillReduction(landfill);
      setWasteTotal(reduction);
    }

    // return reduction;
  };

  return (
    <Grid
      templateColumns={{
        base: "reapeat(1,1fr)",
        md: "reapeat(2,1fr)",
        lg: "repeat(2, 1fr)",
      }}
      gap={6}
    >
      <Card>
        <CardHeader>
          <Heading size="md" mb="0px">
            GHG Switch Calculator
          </Heading>
        </CardHeader>
        <CardBody>
          <form action="" onSubmit={calculateData}>
            <FormControl>
              <FormLabel>Plastic (PET)</FormLabel>
              <InputGroup size="md">
                <InputLeftAddon>KG</InputLeftAddon>
                <Input
                  type="number"
                  defaultValue={0}
                  name="plastic"
                  placeholder="plastic"
                  required
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Styrofoam </FormLabel>
              <InputGroup size="md">
                <InputLeftAddon>KG</InputLeftAddon>
                <Input
                  type="number"
                  defaultValue={0}
                  name="styrofoam"
                  required
                  placeholder="styrofoam"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>

            <Button
              w="100%"
              type="submit"
              size="lg"
              my="30px"
              colorScheme="teal"
            >
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md" mb="0px">
            Bio Switch Result
          </Heading>
        </CardHeader>
        <CardBody>
          <Flex alignItems="flex-end">
            <Box
              height="120px"
              width="120px"
              borderRadius="24px"
              backgroundColor="teal.200"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mr="20px"
            >
              <LuLeafyGreen color="teal" size="60px" />
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {wasteTotal.toLocaleString()}CO2-eq/kg
              </Text>
              <Text fontSize="16px" fontWeight="400">
                GHG Gas emission
              </Text>
            </Box>
          </Flex>
          <Divider my="20px" />
          <Flex alignItems="flex-end">
            <Box
              height="120px"
              width="120px"
              borderRadius="24px"
              backgroundColor="teal.200"
              display="flex"
              justifyContent="center"
              alignItems="center"
              mr="20px"
            >
              <GiEcology color="teal" size="60px" />
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {landfillReduction.toLocaleString()}KG
              </Text>
              <Text fontSize="16px" fontWeight="400">
                Reduction In Landfill
              </Text>
            </Box>
          </Flex>
          <Divider my="40px" />
        </CardBody>
      </Card>
      {/* </Box> */}
    </Grid>
  );
};

export default SwitchingCalculator;
