import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Toast,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";
import LoadingComponent from "../LoadingComponent";
import axios from "axios"
import Userlistitem from "../UserAvatar/userlistitem";
import { getSender } from "../../config/config";

import NotificationBadge, { Effect } from 'react-notification-badge';
const SideDrawer = () => {
  const { user, setSelectedChat,chats,setChats,notifications,setNotifications } = useChatState();
  const { isOpen,onOpen, onClose } = useDisclosure();
 const [loading,setloading]=useState(null);
  
  const navigate = useNavigate();
  const [search,setSearch]=useState();
  const [searchResult, setSearchResult] = useState();

  
  const handlelogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toast=useToast()
  const handleSearch= async(req,res)=>{
    console.log("seearch",search);
    if(!search){
      toast({
        title:"Please enter something in search",
        status:"warning",
        duration: 5000,
        isClosable:true,
        position:"top-left"
      });
      return
    }
      try {
           setloading(true)
          
        
           const config={
            headers:{
              Authorization: `Bearer ${user.token}`
            }
           }
           const {data}=await axios.get(`http://localhost:5000/api/user?search=${search}`,config)
           setSearchResult(data);
           
           console.log(data);

      } catch (error) {
         setloading(false);
      }finally {
        setloading(false);
      }
    
  }

  const accessChat=async(userId)=>{
    // console.log("access by",user.token)
    // console.log("user id",userId);
    try {
       setloading(true);
       const config={
        headers:{
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
       }
       console.log("user Id",userId);
     const {data}=await axios.post("http://localhost:5000/api/chat",{userId},config);
     console.log("data",data);
     if(!chats.find((c)=>c._id===data._id)) setChats([data,...chats]);
      setSelectedChat(data);

      onClose();
      
    } catch (error) {
      toast({
        title:"Please enter something in search",
        description:error.message,
        status:"error",
        duration: 5000,
        isClosable:true,
        position:"top-left"
      });
    }finally{
      setloading(false);
    }
  }
  console.log("notifications",notifications);
  return (
    <>
      <Box

        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button onClick={onOpen}>
            <CiSearch />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="sans-serif">
          Talk-A-Tive
        </Text>

        <Box display="flex" alignItems="center" justifyContent="center">
          <Menu>
           
            <MenuButton p={1}>
            <NotificationBadge
             count={notifications.length}
             effect={Effect.scale}
            />
              <FaBell fontSize="25px" m={1} />
            </MenuButton>
            <MenuList pl="2">
              {!notifications.length && "No News Messages"}
              {notifications.map((notif) => (
        <MenuItem
    key={notif._id}
    onClick={() => {
      setSelectedChat(notif.chat);
      setNotifications(notifications.filter((n) => n !== notif));
    }}
  >
    {notif.chat.isGroupChat
      ? `New Message in ${notif.chat.chatName}`
      : `New Message from ${getSender(user, notif.chat.users)}`}
  </MenuItem>
))}

            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<IoIosArrowDown />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.avatar}
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuItem onClick={handlelogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>Search</DrawerHeader>
            <DrawerBody>
            <Box  display="flex" pb="2">
             <Input placeholder="Search by name or email"
             mr="2"
             value={search}
             onChange={(e)=> setSearch(e.target.value)}
             />

              <Button onClick={handleSearch}>
               Go
              </Button>
            </Box>
            {loading ? (<LoadingComponent/>):(
              searchResult?.map(user =>
                <Userlistitem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
               />
              )
             
            )}
            {loading && <Spinner mt="auto" d="flex" /> }
          </DrawerBody>
          </DrawerContent>
         
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
