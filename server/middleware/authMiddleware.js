const jwt = require('jsonwebtoken');
const UserModel = require('../Models/UserModel/user');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            console.log("Token received:", token);  // Debugging

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decoded);  // Debugging

            const user = await UserModel.findById(decoded.id).select("-password");
            console.log("User found:", user);  // Debugging

            if (!user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }

            // Attach user to req.user
            console.log(user);
            req.user = user;
            
            next();
        } catch (error) {
            console.error("Token verification error:", error);  // Debugging
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

module.exports = protect;
