import React from 'react'
import { useChatState } from '../../Context/ChatProvider'
import SideDrawer from '../../Components/miscellaneous/SideDrawer';
import {Box} from '@chakra-ui/react'
import ChatBox from '../../Components/ChatBox';
import MyChats from '../../Components/MyChats';
export default function Chat() {
  const {user}=useChatState();
  console.log(user);
 console.log(localStorage);
  return (
    <div>
       {user && <SideDrawer/>}
    <Box>
    {user && <ChatBox/>}
    {user && <MyChats/>}
    </Box>
    </div>
  )
}
