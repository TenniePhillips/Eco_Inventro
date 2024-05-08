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
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GiNuclearWaste } from "react-icons/gi";

const WasteGenCalculator = () => {
  const data = [
    {
      name: "Plastic",
      waste: 0.05,
    },
    {
      name: "Styrofoam",
      waste: 0.04,
    },
    {
      name: "Biodegradable",
      waste: 0.03,
    },
  ];

  const [wasteData, setWasteData] = useState({
    type: "",
    unit: "",
    weight: "",
  });

  console.log("wasteData", wasteData);

  const [weightTotal, setWeightTotal] = useState(0);
  const [wasteTotal, setWasteTotal] = useState(0);

  const calculateData = () => {
    const { type, unit, weight } = wasteData;

    var weightTot = Number(weight) * Number(unit);
    var wasteTotal;
    if (type == "Plastic") {
      wasteTotal = weightTot * 0.35;
    } else if (type == "Styrofoam") {
      wasteTotal = weightTot * 0.65;
    } else {
      wasteTotal = weightTot * 0.05;
    }
    setWeightTotal(weightTot);
    setWasteTotal(wasteTotal);
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
      <Card height="100%">
        <CardHeader>
          <Heading size="md" mb="0px">
            Waste Calculator
          </Heading>
        </CardHeader>
        <CardBody>
          <FormControl>
            <FormLabel>Select Type</FormLabel>
            <Select
              placeholder="Material Type"
              onChange={(e) =>
                setWasteData({ ...wasteData, type: e.target.value })
              }
              mb="20px"
            >
              {data.map((item, id) => (
                <option value={item.name} key={id}>
                  {item.name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Average Food Delivery</FormLabel>
            <Input
              type="number"
              placeholder="Unit"
              onChange={(e) =>
                setWasteData({ ...wasteData, unit: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel textTransform="capitalize">
              Average Weight per unit
            </FormLabel>
            <Select
              onChange={(e) =>
                setWasteData({ ...wasteData, weight: e.target.value })
              }
              placeholder="Weight per unit"
              mb="20px"
            >
              <option value={0.5}>0.5kg </option>
              <option value={1}>1kg </option>
              <option value={2}>2kg </option>
              <option value={3}>3kg </option>
              <option value={4}>4kg </option>
              <option value={5}>5kg </option>
              <option value={10}>10kg </option>
            </Select>
          </FormControl>

          <Button
            w="100%"
            size="lg"
            onClick={() => calculateData()}
            my="30px"
            colorScheme="teal"
          >
            Submit
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <Heading size="md" mb="0px">
            Waste Info
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
                <GiNuclearWaste color="teal" size="60px" />
              </Box>
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {(wasteTotal * 30).toLocaleString()}KG
              </Text>
              <Text fontSize="16px" fontWeight="600">
                Total waste per month
              </Text>
              <UnorderedList fontSize="14px" fontWeight="500" lineHeight="28px">
                <ListItem>
                  Total waste per month with biodegradable packaging.
                </ListItem>
                <ListItem>
                  Significantly reduced! Switching to biodegradable options can
                  decrease monthly waste, contributing to a healthier
                  environment.
                </ListItem>
              </UnorderedList>
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
                <GiNuclearWaste color="teal" size="60px" />
              </Box>
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {(wasteTotal * 365).toLocaleString()}KG
              </Text>
              <Text fontSize="16px" fontWeight="600">
                Total waste per year
              </Text>

              <UnorderedList fontSize="14px" fontWeight="500" lineHeight="28px">
                <ListItem>
                  Total waste per year with biodegradable packaging
                </ListItem>
                <ListItem>
                  This figure represents your annual waste footprint. Transition
                  to sustainable materials to make a lasting positive impact on
                  our planet
                </ListItem>
              </UnorderedList>
            </Box>
          </Flex>
          <Divider my="20px" />

          <Text fontSize="16px">
            Plastic waste from food packaging is overwhelming our oceans and
            landfills, damaging the environment. Switching to biodegradable
            packaging reduces pollution, aligns with customer eco-friendly
            expectations, and promotes a healthier planet. Make a change that
            benefits both your business and the Earth.
          </Text>
        </CardBody>
      </Card>
      {/* </Box> */}
    </Grid>
  );
};

export default WasteGenCalculator;
