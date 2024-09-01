import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { FaEye } from "react-icons/fa";
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          dispaly={{ base: "flex" }}
          icon={<FaEye />}
          onClick={onOpen}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
         height="410px"
        >
          <ModalHeader
           fontSize="40px"
           fontFamily="sans work"
           display="flex"
           justifyContent="center"
       
          >{user.name.toUpperCase()}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          >
            <Image
             borderRadius="full"
             objectFit="cover"
             boxSize="150px"
             src={user.avatar}
             alt={user.name}
            />
            <Text fontSize="2rem"
             color="gray"
            >
              {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
