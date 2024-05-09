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
  Switch,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GiGreenhouse } from "react-icons/gi";
import { GiEcology } from "react-icons/gi";
import { LuLeafyGreen } from "react-icons/lu";

const LandifllCalculator = () => {
  const [wasteData, setWasteData] = useState({
    type: "",
    unit: "",
    weight: "",
    styrofoamUnit: "",
    styrofoamWeight: "",
    dencity: "",
    percentage: "",
    plastic: "",
    styrofoam: "",
  });

  const [includeSwitch, setInludeSwitch] = useState(false);

  const [landfillReduction, setLandfillReduction] = useState(0);

  console.log("wasteData", wasteData);

  const landfillSize = 800;

  //   const [weightTotal, setWeightTotal] = useState(0);
  const [wasteTotal, setWasteTotal] = useState(0);

  const plasticGhG = 4;
  const styrofoamGhG = 6;
  const bioGHG = 1.5;

  const handleChange = (e) => {
    setWasteData({
      ...wasteData,
      [e.target.name]: e.target.value,
    });
    setWasteTotal(0);
    setLandfillReduction(0);
  };

  const [ghgTotal, setGhgTotal] = useState(0);

  const calculateData = (e) => {
    e.preventDefault();
    const { styrofoam, plastic, styrofoamUnit, unit, percentage } = wasteData;

    const styrofoamTotal = Number(styrofoam) * Number(styrofoamUnit);
    const plasticTotal = Number(plastic) * Number(unit);

    var weightTot = (plasticTotal + styrofoamTotal) / landfillSize;

    const plasticQty = Number(plastic) * Number(unit);
    const styrofoamQty = Number(styrofoam) * Number(styrofoamUnit);

    const plasticTotal2 = plasticQty * plasticGhG;
    const styrofoamTotal2 = styrofoamQty * styrofoamGhG;

    const volumeTotal = plasticTotal2 + styrofoamTotal2;
    const bioVal = bioGHG * plasticQty + styrofoamQty;

    const reduction = (Number(volumeTotal) - bioVal) * 0.2;

    const landfill =
      (Number(plastic) + Number(styrofoam)) * (Number(percentage) / 100);

    setGhgTotal(reduction);
    setLandfillReduction(landfill);
    setWasteTotal(weightTot);
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
        <CardBody>
          <Heading size="md" mb="20px">
            Packaging Impact Calculator
          </Heading>
          <Text fontSize="16px">
            The Packaging Impact Calculator is designed for food delivery
            businesses, to assess the environmental impact of their packaging
            choices. By entering the weight and total usage of materials like
            plastic and styrofoam, you can compare their greenhouse gas
            emissions. This powerful tool aids in evaluating the benefits of
            switching to more sustainable packaging, helping your business to
            reduce its carbon footprint and enhance its commitment to
            environmental stewardship.
          </Text>
          <form action="" onSubmit={calculateData}>
            <FormControl>
              <FormLabel>Plastic (PET)</FormLabel>
              <InputGroup size="md">
                <InputLeftAddon>KG</InputLeftAddon>
                <Input
                  type="number"
                  required
                  name="plastic"
                  placeholder="plastic"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Average Food Delivery (unit of plastic)</FormLabel>
              <Input
                name="unit"
                type="number"
                placeholder="Unit"
                onChange={handleChange}
              />
            </FormControl>

            <Divider my="30px" />
            <FormControl>
              <FormLabel>Styrofoam </FormLabel>
              <InputGroup size="md">
                <InputLeftAddon>KG</InputLeftAddon>
                <Input
                  type="number"
                  required
                  name="styrofoam"
                  placeholder="styrofoam"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Average Food Delivery (unit of styrofoam)</FormLabel>
              <Input
                type="number"
                name="styrofoamUnit"
                placeholder="unit of styrofoam"
                onChange={handleChange}
              />
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel htmlFor="email-alerts" mb="0">
                Looking to switch?
              </FormLabel>
              <Switch
                value={includeSwitch}
                colorScheme="teal"
                onChange={() => {
                  setInludeSwitch(!includeSwitch);
                  setWasteData({
                    ...wasteData,
                    percentage: 0,
                  });
                  setLandfillReduction(0);
                }}
              />
            </FormControl>

            {includeSwitch && (
              <FormControl>
                <FormLabel textTransform="capitalize">
                  Biodegradable Packaging Target (%)
                </FormLabel>
                <InputGroup size="md">
                  <InputLeftAddon>%</InputLeftAddon>
                  <Input
                    placeholder="Percentage"
                    min={1}
                    max={100}
                    required
                    name="percentage"
                    onChange={handleChange}
                  />
                </InputGroup>
              </FormControl>
            )}

            <Button
              w="100%"
              size="lg"
              type="submit"
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
            Landfill Information
          </Heading>
        </CardHeader>
        <CardBody>
          <Flex alignItems="flex-start">
            <Box width="200px">
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
                <GiGreenhouse color="teal" size="60px" />
              </Box>
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {wasteTotal.toLocaleString()} m³
              </Text>
              <Text fontSize="16px" fontWeight="400">
                {/* Landfill Dencity */}
                Volume of Waste Contributed to Landfill
              </Text>
              <Text>
                This metric estimates the amount of waste your business’s
                packaging sends to landfill spaces. Reducing this figure through
                the use of biodegradable packaging can significantly lessen your
                environmental footprint by decreasing landfill contributions.
              </Text>
            </Box>
          </Flex>
          <Divider my="20px" />
          <Flex alignItems="flex-start">
            <Box width="200px">
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
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {ghgTotal.toLocaleString()} CO2-eq
              </Text>
              <Text fontSize="16px" fontWeight="400">
                Greenhouse Gas Emissions Reduction.
              </Text>

              <Text>
                This metric reflects decreased CO2-equivalent emissions per
                kilogram when using biodegradable materials. Lowering these
                emissions is important for reducing your carbon footprint and
                combating climate change.
              </Text>
            </Box>
          </Flex>
          <Divider my="20px" />
          <Flex alignItems="flex-start">
            <Box width="200px">
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
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {landfillReduction.toLocaleString()} KG m³
              </Text>
              <Text fontSize="16px" fontWeight="400">
                Landfill Reduction with Biodegradable Packaging
              </Text>
              <Text>
                This value represents the reduction in landfill waste achieved
                by using biodegradable packaging. Transitioning to more
                sustainable materials helps decrease your environmental
                footprint and supports a healthier planet.
              </Text>
            </Box>
          </Flex>

          <Divider my="40px" />
          <Text fontSize="16px">
            0-50%: "Great start! Moving even a small portion of your packaging
            to biodegradable materials makes a meaningful difference. Keep
            striving towards greener practices and reduce your carbon footprint
            further!"
            <br /> <br />
            50-100%: "Amazing progress! You're leading the way by fully
            embracing biodegradable packaging. Your dedication significantly
            reduces greenhouse gas emissions and landfill waste. Continue to
            inspire others toward a sustainable future!"
          </Text>
        </CardBody>
      </Card>
      {/* </Box> */}
    </Grid>
  );
};

export default LandifllCalculator;
