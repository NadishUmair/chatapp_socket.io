import React, { useState } from 'react'
import { useChatState } from '../../Context/ChatProvider'
import SideDrawer from '../../Components/miscellaneous/SideDrawer';
import {Box} from '@chakra-ui/react'
import ChatBox from '../../Components/ChatBox';
import MyChats from '../../Components/MyChats';
import Chatbox from '../../Components/ChatBox';
export default function Chat() {
  const {user}=useChatState();
  const [fetchAgain,setFetchAgain]=useState(false);
  console.log("user",user);
//  console.log(localStorage);
  return (
    <div>
       {user && <SideDrawer/>}
       <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  )
}
