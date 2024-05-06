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
import { GiGreenhouse } from "react-icons/gi";

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

  console.log("wasteData", wasteData);

  const landfillSize = 800;

  //   const [weightTotal, setWeightTotal] = useState(0);
  const [wasteTotal, setWasteTotal] = useState(0);

  const handleChange = (e) => {
    setWasteData({
      ...wasteData,
      [e.target.name]: e.target.value,
    });
    setWasteTotal(0);
  };

  const calculateData = (e) => {
    e.preventDefault();
    const { styrofoam, plastic, styrofoamUnit, unit } = wasteData;

    const styrofoamTotal = Number(styrofoam) * Number(styrofoamUnit);

    const plasticTotal = Number(plastic) * Number(unit);

    var weightTot = (plasticTotal + styrofoamTotal) / landfillSize;

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
        <CardHeader>
          <Heading size="md" mb="0px">
            Landfill Calculator
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
                  required
                  name="plastic"
                  placeholder="plastic"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Average Food Deleivery</FormLabel>
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
              <FormLabel>Average Food Deleivery</FormLabel>
              <Input
                type="number"
                name="styrofoamUnit"
                placeholder="Unit"
                onChange={handleChange}
              />
            </FormControl>

            {/* <FormControl>
              <FormLabel textTransform="capitalize">Landfill Dencity</FormLabel>
              <InputGroup size="md">
                <InputLeftAddon>Dencity</InputLeftAddon>
                <Input
                  placeholder="Dencity"
                  required
                  name="dencity"
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl> */}

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
              <GiGreenhouse color="teal" size="60px" />
            </Box>

            <Box>
              <Text fontSize="40px" fontWeight="800" color="teal" mb="0px">
                {wasteTotal.toLocaleString()} KG / m³
              </Text>
              <Text fontSize="16px" fontWeight="400">
                Landfill Dencity
              </Text>
            </Box>
          </Flex>

          <Divider my="40px" />
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

export default LandifllCalculator;
