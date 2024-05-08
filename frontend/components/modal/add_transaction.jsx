import React, { useState, useEffect } from "react";
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
  useToast,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { HandleAllRequest } from "../../tools/request_handler";
// import moment from "moment";

const AddTransactionModal = ({ isOpen, onClose, callBack, data }) => {
  const [transactionForm, setTransactionForm] = useState({
    material: "",
    // measurement: "KG",
    quantity: "",
    action: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    setTransactionForm({
      ...transactionForm,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const createTransaction = async (e) => {
    e.preventDefault();

    if (
      transactionForm.material == "Plastic" &&
      data.plastic < transactionForm.quantity
    ) {
      toast({
        position: "bottom-right",
        description: "Quantity must be lesser than inventory value",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    } else if (
      transactionForm.material == "Styrofoam" &&
      data.styrofoam < transactionForm.quantity
    ) {
      toast({
        position: "bottom-right",
        description: "Quantity must be lesser than inventory value",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    } else if (
      transactionForm.material == "Biodegradable" &&
      data.biodegradable < transactionForm.quantity
    ) {
      toast({
        position: "bottom-right",
        description: "Quantity must be lesser than inventory value",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
    setLoading(true);

    try {
      const req = await HandleAllRequest("/transaction/create", "post", "", {
        material: transactionForm.material,
        // measurement: transactionForm.measurement,
        quantity: transactionForm.quantity,
        action: transactionForm.action,
      });

      setLoading(false);

      if (req.success) {
        toast({
          position: "bottom-right",
          description: req.message,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        onClose();
        callBack();
        setTransactionForm({
          material: "",
          measurement: "",
          quantity: "",
        });
      } else {
        toast({
          position: "bottom-right",
          description: req.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        position: "bottom-right",
        description: error.message ?? "Error",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="30px">
          <form onSubmit={createTransaction} action="">
            <FormControl>
              <FormLabel>Material</FormLabel>
              <Select
                placeholder="Material Type"
                name="material"
                value={transactionForm.material}
                required
                onChange={handleChange}
                mb="20px"
              >
                <option value="Plastic">Plastic</option>
                <option value="Styrofoam">Styrofoam</option>
                <option value="Biodegradable">Biodegradable</option>
              </Select>
            </FormControl>
            {/* <FormControl>
              <FormLabel>Measurement</FormLabel>
              <Select
                placeholder="Measurement"
                required
                name="measurement"
                value={transactionForm.measurement}
                onChange={handleChange}
                mb="20px"
              >
                <option value="KG">KG</option>
              </Select>
            </FormControl>{" "} */}
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <InputGroup size="md">
                <InputLeftAddon>KG</InputLeftAddon>
                <Input
                  type="number"
                  name="quantity"
                  value={transactionForm.quantity}
                  required
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Action Type</FormLabel>
              <Select
                placeholder="Action Type"
                name="action"
                value={transactionForm.action}
                required
                onChange={handleChange}
                mb="20px"
              >
                <option value="Recycled">Recycled</option>
                <option value="Disposed">Disposed</option>
              </Select>
            </FormControl>
            <Button
              isLoading={loading}
              type="submit"
              mb="24px"
              colorScheme="teal"
            >
              Submit
            </Button>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddTransactionModal;
//  teest
