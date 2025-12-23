const jwt = require("jsonwebtoken");
const user=require('../models/User')

const protect = async(req,res,next)=>{
    let token ;
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      try{
           token = req.headers.authorization.split(" ")[1]; 
           const decodede = jwt.verify(token,process.env.JWT_SECRET);
           req.user = await user.findById(decodede.user.id).select("-password");
           next();
      } catch(err){
        console.error("Token verification failed");
        res.status(401).json({message:"Not authorized token failed"})
        
      } 
    }
    else{
        res.status(401).json({message:"Not authorized no token provided"})
    }

};
//Middelware to check if user is an admin
const admin =(req,res,next)=>{
  if(req.user && req.user.role==="admin"){
    next();
  }else{
    console.log("Admin access denied for user:", req.user ? req.user._id : "unknown", "with role:", req.user ? req.user.role : "none");
    res.status(403).json({message:"Not Authorized as admin"})
  }
};
module.exports = { protect ,admin};