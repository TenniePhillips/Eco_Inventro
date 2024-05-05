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
      <Card>
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
            <FormLabel>Average Food Deleivery</FormLabel>
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
          {/* </Box> */}
        </CardBody>
      </Card>
      {/* <Box p="24px" bg="#fff" borderRadius="10px" height="100%"> */}
      <Card>
        <CardHeader>
          <Heading size="md" mb="0px">
            Waste Info
          </Heading>
        </CardHeader>
        <CardBody>
          {/* <Flex justifyContent="space-between">
            <Text fontSize="18px" fontWeight="600">
              Total waste per month:
            </Text>
            <Text>{wasteTotal * 30}kg</Text>
          </Flex>
          <Flex justifyContent="space-between">
            <Text fontSize="18px" fontWeight="600">
              Total waste per year:
            </Text>
            <Text>{wasteTotal * 365}kg</Text>
          </Flex> */}
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
              <GiNuclearWaste color="teal" size="60px" />
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {(wasteTotal * 30).toLocaleString()}KG
              </Text>
              <Text fontSize="16px" fontWeight="400">
                Total waste per month
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
              <GiNuclearWaste color="teal" size="60px" />
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {(wasteTotal * 365).toLocaleString()}KG
              </Text>
              <Text fontSize="16px" fontWeight="400">
                Total waste per year
              </Text>
            </Box>
          </Flex>
          <Divider my="40px" />

          <Divider />
          <Text fontSize="16px">
            The ubiquity of plastic is a terrifying fact – it's everywhere
            around us: in the ground and in the oceans, in our food, and in the
            water we drink. More than 8 million tons of plastic are dumped in
            our oceans every year; by 2050, we are going to have more plastic
            waste than fish. But what can we do about this? Isn't this a problem
            just for big companies and industries? Of course not. Remember that
            little drops make the mighty ocean! Inform yourself and others, be
            aware, change your lifestyle, and take action.
          </Text>
        </CardBody>
      </Card>
      {/* </Box> */}
    </Grid>
  );
};

export default WasteGenCalculator;
