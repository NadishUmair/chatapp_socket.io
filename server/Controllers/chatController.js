
const ChatModel = require("../Models/chatModel/chat");
const UserModel = require("../Models/UserModel/user");


exports.accessChat = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await ChatModel.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await UserModel.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user._id, userId],
      };
  
      try {
        const createdChat = await ChatModel.create(chatData);
        const FullChat = await ChatModel.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  };


exports.fetchChats=async(req,res)=>{
  console.log("req",req.body);
  try {
    ChatModel.find({users:{$elemMatch: {$eq:req.user._id}}})
    .populate("users","-password")
    .populate("groupAdmin","-password")
    .populate("latestMessage")
    .sort({updatedAt:-1})
     .then(async(results)=>{
      results = await UserModel.populate(results,{
        path:'latestMessage.sender',
        select:"name pic email",
      })
       
     res.status(200).send(results)
     })
   
  } catch (error) {
     res.status(500).json({message:error.message})
  }
}

exports.createGroupChat=async (req,res)=>{

  if(!req.body.users || req.body.name){
    return res.status(404).json({message:"please fill all inputs"})
  }
  var users=JSON.parse(req.body.users);
  if(users.length<2){
    return res.status(400).send("more then two users are required to make group")
  }

  users.push(req.user);
  try {
      const groupChat=await ChatModel.create({
        ChatName:req.body.name,
        users:users,
        isGroupChat:true,
        
      })
  } catch (error) {
    
  }

}