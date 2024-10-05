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

const SideDrawer = () => {
  const { isOpen,onOpen, onClose } = useDisclosure();
 const [loading,setloading]=useState(null);
  const { user } = useChatState();
  const navigate = useNavigate();
  const [search,setSearch]=useState();
  const handlelogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const toast=useToast()
  const handleSearch= async(search)=>{
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
           console.log("token",user)
           const config={
            Headers:{
              Authorization: `Bearer ${user.token}`
            }
           }
          
           const {data}=await axios.get(`http://localhost:5000/api/user?seacrch=${search}`,config)
           setloading(false)
           console.log(data);
      } catch (error) {
         setloading(false);
      }
    
  }
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
              <FaBell fontSize="25px" m={1} />
            </MenuButton>
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
            {loading ? (
             <LoadingComponent/>
            ):(
             <h1>Results</h1>
            )}
          </DrawerBody>
          </DrawerContent>
         
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
