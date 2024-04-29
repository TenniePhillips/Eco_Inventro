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
// import moment from "moment";

const RegisterModal = ({ isOpen, onClose, callBack }) => {
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const toast = useToast();

  const handleChange = (e) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);

  const createUser = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const req = await HandleAllRequest("/user/register", "post", "", {
        name: userForm.name,
        email: userForm.email,
        phone: userForm.phone,
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
        <ModalHeader>Register User</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="30px">
          <form onSubmit={createUser} action="">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="name"
                value={userForm.name}
                required
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={userForm.email}
                required
                onChange={handleChange}
              />
            </FormControl>{" "}
            <FormControl>
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
                name="phone"
                value={userForm.phone}
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

export default RegisterModal;
