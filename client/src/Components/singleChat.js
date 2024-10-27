import React, { useEffect, useState } from "react";
import { useChatState } from "../Context/ChatProvider";
import { Box, FormControl, IconButton, Input, Spinner, Text } from "@chakra-ui/react";
import { IoMdArrowBack } from "react-icons/io";
import { getSender, getSenderFull } from "../config/config";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModel from "./miscellaneous/UpdateGroupChatModel";
import axios from "axios";
import { toast } from "react-toastify";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";



const ENDPOINT="http://localhost:5000"
var socket,selectedChatCompare;
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const {
    user,
    chats,
    SelectedChat,
    setSelectedChat,
    notifications,
    setNotifications
  } = useChatState();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState();
  const [newMessage, setNewMessage] = useState();
  const [socketConnected,setSocketConected]=useState(false);
  const [typing,setTyping]= useState(false);
  const [isTyping,setIsTyping]= useState(false);
  // console.log("selected chat", SelectedChat);
  const fetchMessages = async () => {
    if (!SelectedChat) return;


    
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setIsLoading(true);

      const { data } = await axios.get(
        `http://localhost:5000/api/message/${SelectedChat._id}`,
        config
      );
      setMessages(data);
      setIsLoading(false);
      socket.emit("join chat", SelectedChat._id)
      console.log("messges",data);
      // socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };


  const sendMessage =async (event) => {
    console.log("hy");
    if(event.key === "Enter" && newMessage){
      socket.emit("stoptyping",SelectedChat._id);
    try {
      const config={
        headers:{
          'Content-Type':"application/json",
          Authorization:`Bearer ${user.token}`
        }
      }
      const {data}=await axios.post("http://localhost:5000/api/message/",{
        content:newMessage,
        chatId:SelectedChat._id
      },
      config
    )
    socket.emit("new message",data)
    setNewMessage("");
    setMessages([...messages, data]);
    console.log(data);
    }
    catch (error) {
      toast({
        title:"Error ocuured",
        description:"failed to send message",
        status:"error",
        duration: 5000,
        isClosable:true,
        position:"top-left"
      });
    }
    }

  };


  const typingHandler=(e)=>{
   setNewMessage(e.target.value);
   if(!socketConnected) return;
   if(!typing){
    setTyping(true);
    socket.emit("typing",SelectedChat._id)
   }
   let lastTypingTime=new Date().getTime();
   var timerLength=3000;
   setTimeout(()=>{
    var timeNow=new Date().getTime();
    var timediff=timeNow - lastTypingTime
    if(timediff  >= timerLength && typing){
      socket.emit("stoptyping",SelectedChat._id)
      setTyping(false);
    }
   },timerLength)

  };
  useEffect(()=>{
    socket= io(ENDPOINT);
    socket.emit("setup",user);
    socket.on("connected",()=>setSocketConected(true))
    socket.on("typing",()=>setIsTyping(true))
    socket.on("stoptyping",()=>setIsTyping(false))
   },[])
   
  useEffect(()=>{
   fetchMessages();
   selectedChatCompare=SelectedChat
  },[SelectedChat])



  useEffect(()=>{
    socket.on("message recieved",(newMessageRecieved)=>{
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
       if(!notifications.includes())
        {
          setNotifications([newMessageRecieved,...notifications])
          setFetchAgain(!fetchAgain);
        }
      }else{
        setMessages([...messages,newMessageRecieved])
      }
    })
  })
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
                {getSender(user, SelectedChat?.users)}
                <ProfileModal user={getSenderFull(user, SelectedChat?.users)} />
              </>
            ) : (
              <>
                {SelectedChat.chatName?.toUpperCase()}
                <UpdateGroupChatModel
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
           height="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
           {isLoading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                <ScrollableChat messages={messages} />
              </div>
            )}
           
            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {isTyping ? <div>typing...</div> : <></>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                onChange={typingHandler}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100%"
          
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
