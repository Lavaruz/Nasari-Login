const jwt = require('jsonwebtoken')
require("dotenv").config();

function verifyJWT(req,res,next){
    const authHeader = req.headers.authorization || req.headers.Authorization

    if(!authHeader?.startsWith("Bearer ")){
        return res.status(401).json({message: "Unauthorized, Bearer Not Found"})
    }
    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
        if(err) return res.status(403).json({message: "Access Token Expired"})
        req.username = decoded.username
        next()
    })
}

module.exports = {verifyJWT}