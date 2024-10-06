import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useSafeLayoutEffect, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useChatState } from '../../Context/ChatProvider';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChat,setGroupChat]=useState();
    const [selectedUsers,setSelectedUsers]=useState([]);
    const [search,setSearch]=useState();
   const [searchResult,setSearchResult]=useState([]);
   const [loading,setloading]=useState(false);
   const toast =useToast();

   const {user,chats,setChats}=useChatState();
    return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >Create Group Chats
          </ModalHeader>
              <ModalCloseButton />
              <ModalBody d="flex" flexDir="column" alignItems="center">
              <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                // onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
               
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal