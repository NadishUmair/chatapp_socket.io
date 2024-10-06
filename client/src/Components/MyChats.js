import React, { useEffect, useState } from 'react'
import { useChatState } from '../Context/ChatProvider';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyChats = () => {
  const [logedUser,setLogedUser]=useState();
  const { user, setSelectedChat,chats,setChats } = useChatState();
  const [loading,setloading]=useState();

  const fetchChats=async()=>{
    try {
      //  setloading(true);
       
       const config={
        headers:{
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
       }
      //  console.log(config);
     const {data}=await axios.get("http://localhost:5000/api/chat",config);
     console.log("chat list",data);
      setChats(data);
      onClose();
      
    } catch (error) {
      toast({
        title:"Please enter something in search",
        description:"failed to load chats",
        status:"error",
        duration: 5000,
        isClosable:true,
        position:"top-left"
      });
    }finally{
      // setloading(false);
    }
  }
  useEffect(()=>{
    // console.log("hy");
    setLogedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  },[])
  return (
    <div>MyChats</div>
  )
}

export default MyChats