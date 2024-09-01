import { Avatar, AvatarBadge, Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaBell } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { useChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';


const SideDrawer = () => {
  const { user }=useChatState()
  const navigate = useNavigate();

  const handlelogout=()=>{
    localStorage.removeItem("userInfo")
    navigate("/")
  }
  return (
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
        <Button>
          <CiSearch />
          <Text display={{ base: 'none', md: 'flex' }} px="4">
            Search
          </Text>
        </Button>
      </Tooltip>

      <Text fontSize="2xl" fontFamily="sans-serif">
        Talk-A-Tive
      </Text>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
     
       
      >
        <Menu>
          <MenuButton p={1}>
            <FaBell fontSize="25px" m={1} />
          </MenuButton>
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<IoIosArrowDown />}>
            <Avatar size="sm" cursor="pointer" name={user.name}
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
  );
};

export default SideDrawer;
