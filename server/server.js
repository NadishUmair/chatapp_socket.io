const express=require('express');
const cors = require('cors');
require('dotenv').config();
const ConnectDB = require('./config/connDb');

const app=express();
app.use(cors());
const userRoutes=require("./Routes/userRoutes");
const chatRoutes=require("./Routes/chatRoutes");
const mesageRoutes=require("./Routes/messageRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(express.json());
ConnectDB();
app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
app.use("/api/message",mesageRoutes)
app.use(notFound);
app.use(errorHandler)


const PORT = process.env.PORT;

const server = app.listen(
    PORT,
    console.log(`Server running on PORT ${PORT}...`)
  );

  const io=require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3000"
    }
  })
  io.on("connection",(socket)=>{
    console.log("connected to socket.io")
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });

   socket.on("typing",(room)=>socket.in(room).emit("typing"))
   socket.on("stoptyping",(room)=>socket.in(room).emit("stoptyping"))
      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });

  })