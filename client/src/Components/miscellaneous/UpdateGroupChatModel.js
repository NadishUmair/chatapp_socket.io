import { Box, Button, FormControl, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Toast, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { useChatState } from '../../Context/ChatProvider';
import UserBadgeItem from '../UserAvatar/userBadgeItem';
import axios from 'axios';
import UserListItem from '../UserAvatar/userlistitem';
import {toast} from "react-toastify";

const UpdateGroupChatModel = ({fetchAgain,setFetchAgain}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupChatName,setGroupChatName]= useState();
    const [search,setSearch]=useState();
    const [searchResult,setSearchResult]=useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [renameLoading,setRenameIsLoading]=useState(false);
    const {user,SelectedChat,setSelectedChat}=useChatState();



    
    const handleAddUser=async(user1)=>{
      console.log(user1);
      if(SelectedChat.users?.find((u)=>u._id === user1._id)){
        toast({
          title:"Error occured",
          description:"failed to search result",
          status:"warning",
          duration: 5000,
          isClosable:true,
          position:"top-left"
        });
        return
      }
      if(SelectedChat.groupAdmin._id !== user._id){
        toast({
          title:"only admin can add someone",
          status:"error",
          duration: 5000,
          isClosable:true,
          position:"top-left"
        });
        return
      }
      try {
           setIsLoading(true);
           const config={
            headers:{
              Authorization: `Bearer ${user.token}`
            }
           }
           const {data}=await axios.put("http://localhost:5000/api/chat/groupadd",{
            chatId:SelectedChat._id,
            userId:user1._id
           },
           config
          )
             setSelectedChat(data);
             setFetchAgain(!fetchAgain);
             setIsLoading(false);
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }

    const handleRename=async()=>{
      if(!groupChatName) return;
      try {
        console.log(SelectedChat._id);
        setIsLoading(true);
        console.log("user",user.token);
         const config={
          headers:{
            Authorization: `Bearer ${user.token}`
          }
         }
         console.log("config",config);
         const {data}=await axios.put("http://localhost:5000/api/chat/rename",{
          chatId:SelectedChat._id,
          chatName:groupChatName
         },
          config  
        )

        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setIsLoading(false)
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        setIsLoading(false);
      }
      setGroupChatName("")
    }
    const handleSearch=async(query)=>{
  
      setSearch(query);
     
    if(!query){
      return;
    }
       try {
          setIsLoading(true);
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
        setIsLoading(false);
       }
  
     };
  
     const handleRemove = async (user1) => {
    
      if (SelectedChat.isGroupAdmin?._id !== user?._id && user1._id !== user._id) {
        console.log("hy");
        toast({
          title: "Only admins can remove someone!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
  
      try {
        setIsLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        console.log("config",config);
        const { data } = await axios.put("http://localhost:5000/api/chat/groupremove",
          {
            chatId: SelectedChat._id,
            userId: user1._id,
          },
          config
        );
        setIsLoading(false);
        console.log("data",data)
  
        user1?._id === user._id ? setSelectedChat() : setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        fetchMessages();
        
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: "error",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setIsLoading(false);
      }
      setGroupChatName("");
    };
  return (
    <>
    <IconButton display={{base:'flex'}} icon={<FaEye/>} onClick={onOpen}/>

<Modal isOpen={isOpen} onClose={onClose} isCentered>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader
    fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
    
    >{SelectedChat.chatName}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
     <Box>
     {SelectedChat?.users?.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={SelectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
     </Box>
     <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {isLoading ? ( 
                <Spinner size="lg" />
                ):(
                 searchResult?.slice(0,4).map((user)=>(
                   <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={(()=>handleAddUser(user))}
                   />
                 ))
               )}
    </ModalBody>

    <ModalFooter>
       <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
    </ModalFooter>
  </ModalContent>
</Modal>
    </>
  )
}

export default UpdateGroupChatModel