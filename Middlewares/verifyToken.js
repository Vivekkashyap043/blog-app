const jwt = require('jsonwebtoken')
require('dotenv').config()

function verifyToken(req, res, next){
    const bearerToken = req.headers.authorization;
    if(!bearerToken){
        return res.send({messsage: "Unauthorized access. please login to continue"})
    }
    const token = bearerToken.split(" ")[1]
    try{
        jwt.verify(token, process.env.SECRET_KEY)
    }catch(err){
        next(err)
    }
}
module.exports=verifyToken;