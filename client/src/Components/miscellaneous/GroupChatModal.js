import { Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useSafeLayoutEffect, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useChatState } from '../../Context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/userlistitem';
import UserBadgeItem from '../UserAvatar/userBadgeItem';

const GroupChatModal = ({children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName,setGroupChatName]=useState();
    const [selectedUsers,setSelectedUsers]=useState([]);
    const [search,setSearch]=useState();
   const [searchResult,setSearchResult]=useState([]);
   const [loading,setloading]=useState(false);
   const toast =useToast();

   const {user,chats,setChats}=useChatState();

   const handleSearch=async(query)=>{
  
    setSearch(query);
   
  if(!query){
    return;
  }
     try {
        setloading(true);
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        }
        const {data} =await axios.get(`http://localhost:5000/api/user?search=${search}`,config);
         console.log(data);
       
        setSearchResult(data);
     } catch (error) {
      console.log(error);
      toast({
        title:"Error occured",
        description:"failed to search result",
        status:"warning",
        duration: 5000,
        isClosable:true,
        position:"top-left"
      });
     }finally{
      setloading(false);
     }

   };


const handleSubmit=async()=>{
  if(!groupChatName || !selectedUsers){
    toast({
      title:"Please Fill All Fields",
      description:"failed to submitt",
      status:"warning",
      duration: 5000,
      isClosable:true,
      position:"top-left"
    });
  }
  try {
    const config={
      headers:{
        Authorization:`Bearer ${user.token}`
      }
    }
     const {data}=await axios.post("http://localhost:5000/api/chat/group",{name:groupChatName,
      users:  JSON.stringify(selectedUsers.map((u)=>u._id))
    },config)
    console.log("data of group",data);
    setChats([data,...chats])
    onClose();
    toast({
      title:"New Chat is Created",
      description:"failed to submitt",
      status:"success",
      duration: 5000,
      isClosable:true,
      position:"top-left"
    });

    } catch (error) {
      toast({
        title:"Error in creating Chat",
        description:"failed to submitt",
        status:"warning",
        duration: 5000,
        isClosable:true,
        position:"top-left"
      });
  }
};

const handleGroup=(userToAdd)=>{
  if(selectedUsers?.includes(userToAdd)){
    toast({
      title:"User Already Added",
      description:"failed to search result",
      status:"warning",
      duration: 5000,
      isClosable:true,
      position:"top-left"
    })
    return;
  }
   setSelectedUsers([...selectedUsers,userToAdd])
};
const handleDelete=(deletuser)=>{
      setSelectedUsers(selectedUsers.filter((user)=>user._id !==deletuser._id));
     
}
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
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
              <FormControl>
              <Input
                placeholder="Add User"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
               
            {selectedUsers?.map((u) => (
  <UserBadgeItem key={u._id} user={u} handleFunction={() => handleDelete(u)} />
))}



               {loading ? ( 
                <div>laoding</div>
                ):(
                 searchResult?.slice(0,4).map((user)=>(
                   <UserListItem
                    key={user._id}
                     user={user}
                    handleFunction={(()=>handleGroup(user))}
                   />
                 ))
               )}


              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                  Create Chat
                </Button>
                
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default GroupChatModal