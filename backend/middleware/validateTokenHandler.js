const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) => {
    let authHeader = req.headers.authorization || req.headers.Authorization;

    if(authHeader && authHeader.startsWith("Bearer")){
        const token = authHeader.split(" ")[1];

            if(!token){
                res.status(401);
                throw new Error("Token missing");
            }
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded.user;
            next();
        } else {
            res.status(401);
            throw new Error("No token provided");
        }
    });
module.exports = validateToken;