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
} from "@chakra-ui/react";
import { HandleAllRequest } from "../../tools/request_handler";
import moment from "moment";

const AddInventryModal = ({ isOpen, onClose, callBack }) => {
  const [inventoryForm, setInventoryForm] = useState({
    name: "",
    material: "",
    measurement: "",
    supplier: "",
    quantity: "",
    orderDate: "",
    deliveryDate: "",
  });

  const [supplier, setSupplier] = useState([]);

  const getSuppplier = async () => {
    setLoading(true);
    var req = await HandleAllRequest("/supplier/fetch", "get", "", {});

    setLoading(false);
    if (req.success == true) {
      setSupplier(req.data);
    } else {
      toast({
        position: "bottom-right",
        description: req.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const toast = useToast();

  const handleChange = (e) => {
    setInventoryForm({
      ...inventoryForm,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const createInventory = async (e) => {
    e.preventDefault();
    setLoading(true);

    var deliDate = moment(inventoryForm.deliveryDate).format("DD-MM-YYYY");
    var ordDate = moment(inventoryForm.orderDate).format("DD-MM-YYYY");

    try {
      const req = await HandleAllRequest("/inventory/create", "post", "", {
        name: inventoryForm.name,
        material: inventoryForm.material,
        measurement: inventoryForm.measurement,
        supplier: inventoryForm.supplier,
        quantity: inventoryForm.quantity,
        orderDate: ordDate,
        deliveryDate: deliDate,
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
        setInventoryForm({
          name: "",
          material: "",
          measurement: "",
          supplier: "",
          quantity: "",
          orderDate: "",
          deliveryDate: "",
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

  useEffect(() => {
    getSuppplier();
  }, []);

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Inventory</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="30px">
          <form onSubmit={createInventory} action="">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={inventoryForm.name}
                required
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Supplier</FormLabel>
              <Select
                placeholder="Select supplier"
                name="supplier"
                value={inventoryForm.supplier}
                required
                onChange={handleChange}
              >
                {supplier.map((item, id) => (
                  <option key={id} value={item._id}>
                    {item.supplier}
                  </option>
                ))}
              </Select>
              {/* <Input
                type="text"
                name="supplier"
                value={inventoryForm.supplier}
                required
                onChange={handleChange}
              /> */}
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Material</FormLabel>
              <Select
                placeholder="Material Type"
                name="material"
                value={inventoryForm.material}
                required
                onChange={handleChange}
                mb="20px"
              >
                <option value="Plastic">Plastic</option>
                <option value="Styrofoam">Styrofoam</option>
                <option value="Biodegradable">Biodegradable</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Measurement</FormLabel>
              <Select
                placeholder="Measurement"
                required
                name="measurement"
                value={inventoryForm.measurement}
                onChange={handleChange}
                mb="20px"
              >
                <option value="KG">KG</option>
                <option value="g">G</option>
                {/* <option value="Litres">Litres</option> */}
              </Select>
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                type="number"
                name="quantity"
                value={inventoryForm.quantity}
                required
                onChange={handleChange}
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Order Date</FormLabel>
              <Input
                type="date"
                name="orderDate"
                value={inventoryForm.orderDate}
                required
                onChange={handleChange}
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Delivery Date</FormLabel>
              <Input
                type="date"
                name="deliveryDate"
                value={inventoryForm.deliveryDate}
                required
                onChange={handleChange}
              />
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

export default AddInventryModal;
