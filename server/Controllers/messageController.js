const ChatModel = require("../Models/chatModel/chat");
const MessageModel = require("../Models/MessageModel/message");
const UserModel = require("../Models/UserModel/user");



exports.sendMessage=async()=>{
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
        var message=await Message.create(newMessage);

        message=await message.populate("sender","name avatar").execPopulate();
        message=await message.populate("chat").execPopulate();
        message=await UserModel.populate(message,{
            path:"chat.users",
            select:"name avatar email"
        })
        await ChatModel.findByIdAndUpdate(req.body.chatId,{
            latestMessage:message
        })
        res.json(message)
    } catch (error) {
         throw new Error(error.message)
    }
}