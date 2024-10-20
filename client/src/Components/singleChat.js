import React from 'react'
import { useChatState } from '../Context/ChatProvider'
import { Box, IconButton, Text } from '@chakra-ui/react';
import { IoMdArrowBack } from 'react-icons/io';
import { getSender, getSenderFull } from '../config/config';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModel from './miscellaneous/UpdateGroupChatModel';

const SingleChat = () => {
    const  {user,chats,SelectedChat,setSelectedChat,fetchAgain,setFetchAgain}=useChatState();
    console.log("selected chat",SelectedChat);
  return (
    <>
       
      {SelectedChat ? (
        <> 
        <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
              <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<IoMdArrowBack />}
              onClick={() => setSelectedChat("")}
            />
            {!SelectedChat.isGroupChat ? (
             <>
             {getSender(user,SelectedChat?.users)}
              <ProfileModal user={getSenderFull(user,SelectedChat?.users)}/>
             </>
            )
            :(
                <>
                
                 {SelectedChat.chatName?.toUpperCase()}
                 <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                 />
                </>
            )}
          </Text>
          <Box
            d="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          ></Box>
        </>
        ):(
          <Box display="flex" alignItems="center" justifyContent="center" h="100%">
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
        )
        }
    </>
  )
}

export default SingleChat;