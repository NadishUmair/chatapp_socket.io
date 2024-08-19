const express=require("express");
const { registerUser, authUser } = require("../Controllers/userControllers");
const upload = require("../middleware/multer.middlware");




const router = express.Router();

router.route("/register").post(
    upload?.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ])
,registerUser);
router.post("/login",authUser);

module.exports= router;