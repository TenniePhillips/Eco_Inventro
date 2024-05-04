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
  useToast,
} from "@chakra-ui/react";
import { HandleAllRequest } from "../../tools/request_handler";

const AddSupplierModal = ({ isOpen, onClose, callBack }) => {
  const [supplierForm, setSupplierForm] = useState({
    name: "",
    email: "",
    phone: "",
    supplier: "",
    address: "",
    website: "",
    payment: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    setSupplierForm({
      ...supplierForm,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const createSupplier = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const req = await HandleAllRequest("/supplier/create", "post", "", {
        name: supplierForm.name,
        email: supplierForm.email,
        phone: supplierForm.phone,
        supplier: supplierForm.supplier,
        address: supplierForm.address,
        website: supplierForm.website,
        payment: supplierForm.payment,
      });

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
        setSupplierForm({
          name: "",
          email: "",
          phone: "",
          supplier: "",
          address: "",
          website: "",
          payment: "",
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
        <ModalHeader>Add Supplier</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={createSupplier}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={supplierForm.name}
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                value={supplierForm.email}
                required
                onChange={handleChange}
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input
                type="phone"
                name="phone"
                value={supplierForm.phone}
                required
                onChange={handleChange}
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                name="supplier"
                value={supplierForm.supplier}
                required
                onChange={handleChange}
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                value={supplierForm.address}
                required
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Website</FormLabel>
              <Input
                type="text"
                name="website"
                value={supplierForm.website}
                required
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Payment Type</FormLabel>
              <Select
                placeholder="Payment Option"
                name="payment"
                value={supplierForm.payment}
                required
                onChange={handleChange}
                mb="20px"
              >
                <option value="Card">Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
              </Select>
            </FormControl>
            <Button
              isLoading={loading}
              mb="24px"
              type="submit"
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

export default AddSupplierModal;
