import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [SelectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    setUser(user);
    if (user) navigate("/chat");
  }, [navigate]);
  return (
    <ChatContext.Provider
      value={{ user, setUser, SelectedChat, setSelectedChat, chats, setChats,notifications,setNotifications }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
