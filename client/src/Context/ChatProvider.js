import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const navigate=useNavigate();
    const [user,setUser]=useState();
    const [token,setToken]=useState();
    const [SelectedChat,setSelectedChat]=useState();
    const [chats,setChats]=useState([]);
    useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("userInfo"))
    const token=JSON.parse(localStorage.getItem("talk_token"))
    setToken(token);
    setUser(user);
    if(user) navigate("/chat")
    },[navigate])
  return (
    <ChatContext.Provider value={{ user,setUser,SelectedChat,setSelectedChat,chats,setChats,token,setToken}}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
