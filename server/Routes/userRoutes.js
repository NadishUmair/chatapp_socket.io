const express=require("express");
const { registerUser, authUser, Allusers } = require("../Controllers/userControllers");
const upload = require("../middleware/multer.middlware");




const router = express.Router();

router.route("/").post(
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
,registerUser).get(Allusers);
router.post("/login",authUser);

module.exports= router;