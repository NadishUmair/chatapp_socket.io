import React, { useEffect, useState } from 'react'
import { useChatState } from '../Context/ChatProvider';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import LoadingComponent from './LoadingComponent';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { getSender } from '../config/config';
import GroupChatModal from './miscellaneous/GroupChatModal';

const MyChats = ({fecthAgain}) => {
  const [logedUser,setLogedUser]=useState();
  const { user, setSelectedChat,selectedChat,chats,setChats, token} = useChatState();
  const [loading,setloading]=useState();


 
  const fetchChats=async()=>{
    try {
      //  setloading(true);
       
       const config={
        headers:{
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`
        }
       }
      //  console.log(config);
     const {data}=await axios.get("http://localhost:5000/api/chat",config);
     console.log("chat list",data);
      setChats(data);
      onClose();
      
    } catch (error) {
      toast({
        title:"Please enter something in search",
        description:"failed to load chats",
        status:"error",
        duration: 5000,
        isClosable:true,
        position:"top-left"
      });
    }finally{
      // setloading(false);
    }
  }
  useEffect(()=>{
    // console.log("hy");
    setLogedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[fecthAgain])
   console.log("loged user",logedUser);
  return (
    <Box
    d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
    flexDir="column"
    alignItems="center"
    p={3}
    bg="white"
    w={{ base: "100%", md: "31%" }}
    borderRadius="lg"
    borderWidth="1px"
  >
    <Box
      pb={3}
      px={3}
      fontSize={{ base: "28px", md: "30px" }}
      fontFamily="Work sans"
      d="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      My Chats
     
     <GroupChatModal>

        <Button
          d="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<IoMdAddCircleOutline />}
          >
          New Group Chat
        </Button>
    </GroupChatModal>
    </Box>
    <Box
      d="flex"
      flexDir="column"
      p={3}
      bg="#F8F8F8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
    >
      {chats ? (
        <Stack overflowY="scroll">
          {chats.map((chat) => (
            <Box
              onClick={() => setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat ? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
            >
              <Text>
                {!chat.isGroupChat
                  ? getSender(logedUser, chat.users)
                  : chat.chatName}
              </Text>
              {/* {chat.latestMessage && (
                <Text fontSize="xs">
                  <b>{chat.latestMessage.sender.name} : </b>
                  {chat.latestMessage.content.length > 50
                    ? chat.latestMessage.content.substring(0, 51) + "..."
                    : chat.latestMessage.content}
                </Text>
              )} */}
            </Box>
          ))}
        </Stack>
      ) : (
        <LoadingComponent />
      )}
    </Box>
  </Box>
  )
}

export default MyChats