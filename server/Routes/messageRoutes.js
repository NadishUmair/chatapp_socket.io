const express=require('express');
const protect = require('../middleware/authMiddleware');
const { sendMessage } = require('../Controllers/messageController');
const router=express.Router();


router.route('/').post(protect,sendMessage)
// router.route('/:chatId').get(protect,Messages)

module.exports= router;