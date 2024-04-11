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

const AddSupplierModal = ({ isOpen, onClose }) => {
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Supplier</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input type="email" />
          </FormControl>{" "}
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input type="phone" />
          </FormControl>{" "}
          <FormControl>
            <FormLabel>Supplier</FormLabel>
            <Input type="text" />
          </FormControl>{" "}
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Website</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl>
            <FormLabel>Payment Type</FormLabel>
            <Select placeholder="Payment Option" mb="20px">
              <option value="Card">Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue">Submit</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSupplierModal;
