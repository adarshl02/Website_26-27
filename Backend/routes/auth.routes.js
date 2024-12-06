const express = require("express");
const db = require("../db/index.js");
const jwt = require('jsonwebtoken');
const { errorHandler } = require("../utils/errorHandler.js");


const router = express.Router();

router.post("/auth/google", async (req, res,next) => {
  try {
    const { name, email, avatar, enrollment } = req.body;
    
  console.log(req.body);
  
    const existingUser = await db("users").where({ email }).first();
    console.log(existingUser);
     
    if (existingUser) {
      const token = jwt.sign({ id: existingUser.id },process.env.JWT_SECRET);
      const { enrollment: enro, ...rest } = existingUser; 
      res.cookie('access_token', token, { 
        httpOnly: true,
        secure:true,
       // secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        sameSite: 'Strict' 
      });
      return res.status(200).json(rest); 
    } else {

      if(req.body.enrollment==false){
        return res
        .status(404)
        .send(
          errorHandler(
            404,
            "Not Found",
            "User with specified email not found"
          )
        );
    }
      
      if (!enrollment || enrollment.length !== 12) {
        return  res
        .status(404)
        .send(
          errorHandler(
            404,
            "Not Found",
            "Wrong Credentials"
          )
        );
      }

      let branch = enrollment.slice(4, 6).toUpperCase();
      let batch = enrollment.slice(6, 8);

      const newUser = {
        name,
        email,
        avatar,
        batch,
        branch,
        enrollment,
      };

      const [insertedUser] = await db("users").insert(newUser).returning("*"); // Insert and return the new user

      const token = jwt.sign({ id: insertedUser.id },"asdfghjkl");
      const { enrollment: enro, ...rest } = insertedUser; 
      res.cookie('access_token', token, { httpOnly: true }) 
        .status(200)
        .json(rest); 
    }
  } catch (error) {
    next(error); 
  }
});

router.get("/auth/signout",(req,res,next)=>{
  try{
    res.clearCookie('access_token');
    res.status(200).json('Sign out successfully');
 }catch(error){
    next(error);
 }

})



module.exports = router;