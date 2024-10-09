import React from 'react'
import { useChatState } from '../Context/ChatProvider'

const SingleChat = () => {
    const  {chats,SelectedChat,setSelectedChat}=useChatState();
  return (
    <div>singleChat</div>
  )
}

export default SingleChat;