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
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";

const SideDrawer = () => {
  const { isOpen,onOpen, onClose } = useDisclosure();
  const { user } = useChatState();
  const navigate = useNavigate();
  const [search,setSearch]=useState();
  const handlelogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
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
          </DrawerContent>
          <DrawerBody>
            <Box  display="flex" pb="2">
             <Input placeholder="Search"
             mr="2"
             value={search}
             onChange={(e)=> setSearch(e.target.value)}
             >

             </Input>
              < Button>
               Go
              </Button>
            </Box>
          </DrawerBody>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SideDrawer;
