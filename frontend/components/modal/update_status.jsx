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
  Text,
} from "@chakra-ui/react";
import { HandleAllRequest } from "../../tools/request_handler";

const EditInventryModal = ({ isOpen, onClose, id, callBack }) => {
  const [status, setStatus] = useState("");

  const toast = useToast();

  const [loading, setLoading] = useState(false);

  const updateStatus = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const req = await HandleAllRequest(
        `/inventory/update_status/${id}`,
        "patch",
        "",
        {
          status: status,
        }
      );

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
        setStatus("");
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
        <ModalHeader>Update Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="30px">
          <form onSubmit={updateStatus} action="">
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                placeholder="Status"
                required
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                mb="20px"
              >
                <option value="delivered">Delivered</option>
                <option value="pending">Pending</option>
              </Select>
            </FormControl>{" "}
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

export default EditInventryModal;
