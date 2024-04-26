import React from "react";
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
} from "@chakra-ui/react";

const AddInventryModal = ({ isOpen, onClose }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Inventory</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="30px">
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Supplier</FormLabel>
            <Input type="text" />
          </FormControl>{" "}
          <FormControl>
            <FormLabel>Type</FormLabel>
            <Select placeholder="Material Type" mb="20px">
              <option value="PET">PET</option>
              <option value="Plastic">Plastic</option>
              <option value="PolyStyrene">PolyStyrene</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Measurement</FormLabel>
            <Select placeholder="Measurement" mb="20px">
              <option value="KG">KG</option>
              <option value="cl">CL</option>
              <option value="Litres">Litres</option>
            </Select>
          </FormControl>{" "}
          <FormControl>
            <FormLabel>Quantity</FormLabel>
            <Input type="number" />
          </FormControl>{" "}
          <FormControl>
            <FormLabel>Order Date</FormLabel>
            <Input type="date" />
          </FormControl>{" "}
          <FormControl>
            <FormLabel>Delivery Date</FormLabel>
            <Input type="date" />
          </FormControl>{" "}
          {/* <FormControl>
            <FormLabel>Disposal Method</FormLabel>
            <Select placeholder="Material Type" mb="20px">
              <option value="Compostable">Compostable</option>
              <option value="Recycle">Recycle</option>
              <option value="Landfill">Landfill</option>
            </Select>
          </FormControl> */}
          <Button colorScheme="blue">Submit</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddInventryModal;
