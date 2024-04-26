import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Select,
  FormControl,
  FormLabel,
  FormHelperText,
  Box,
} from "@chakra-ui/react";

const CaculatorModal = ({ isOpen, onClose }) => {
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

    var weightTot = weight * unit;
    var wasteTotal;
    if (type == "Plastic") {
      wasteTotal = weightTot * 0.9;
    } else if (type == "Styrofoam") {
      wasteTotal = weightTot * 0.95;
    } else {
      wasteTotal = weightTot * 0.05;
    }
    setWeightTotal(weightTot);
    setWasteTotal(wasteTotal);
    // console.log("waste total", weightTot, "waste total", wasteTotal);
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Waste Calculator</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
                <option value={item.name}>{item.name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Units</FormLabel>
            <Input
              type="number"
              onChange={(e) =>
                setWasteData({ ...wasteData, unit: e.target.value })
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Weight per unit</FormLabel>
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
          <Box>
            <Box fontSize="20px" fontWeight="600">
              Waste Total: {wasteTotal}{" "}
            </Box>
            <Box fontSize="20px" fontWeight="600">
              Weight Total: {weightTotal}
            </Box>
          </Box>
          <Button
            w="100%"
            onClick={() => calculateData()}
            my="30px"
            colorScheme="teal"
          >
            Submit
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CaculatorModal;
