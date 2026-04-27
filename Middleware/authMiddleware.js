var jwt = require("jsonwebtoken")

var authMiddleware = async(req,res,next)=>{
    try{
        var authHeader = req.headers.authorization
        console.log(authHeader);
        if(!authHeader){
            return res.status(401).json({message : "no token found"})
        }
        var token = authHeader.split(" ")[1]
        console.log(token);
        var decode = jwt.verify(token,process.env.JWT_TOKEN)
        // Normalize user identifier for all controllers
        if (decode && !decode.id && decode.userId) {
            decode.id = decode.userId
        }
        req.user = decode
        next()

    }catch(error){
        return res.status(401).json({
            message: "Invalid or malformed token"
        });
    }
}

module.exports = authMiddleware