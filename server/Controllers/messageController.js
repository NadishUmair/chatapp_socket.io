const ChatModel = require("../Models/chatModel/chat");
const MessageModel = require("../Models/MessageModel/message");
const UserModel = require("../Models/UserModel/user");



exports.sendMessage=async(req,res)=>{
    const {content,chatId}=req.body;
         if(!content || !chatId ){
            return res.sendStratus(400)
         }
         var newMessage={
            sender:req.user._id,
            content:content,
            chat:chatId
         }
    try {
        var message=await MessageModel.create(newMessage);

        message=await message.populate("sender","name avatar")
        message=await message.populate("chat")
        message=await UserModel.populate(message,{
            path:"chat.users",
            select:"name avatar email"
        })
        await ChatModel.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })
        res.json(message)
    } catch (error) {
        res.send(error.message)
    }
}


exports.AllMessages=async(req,res)=>{
    try {
        console.log("params",req.params)
        const id=req.params.chatId;
        const Messages=await MessageModel.find({chat:id}).populate(
            "sender","name avatar"
        ).populate("chat")

        res.json(Messages);
    } catch (error) {
          res.status(500).json(error.message);
    }
}