const userModel = require("../models/user");
const bcrypt =require("bcrypt");
const jwt =require("jsonwebtoken");
const sceretkey ="notesapi";


 const signup = async(req,res )=>{

 const {username,password,email}=req.body;
 try {
    const existinguser=await userModel.findOne({email : email});
    if(existinguser){
        return res.status(400).json({message : "user already exist"});
    }

    const hashpassword=await bcrypt.hash(password,10);

    const result = await userModel.create({
        username : username,
        email : email,
        password : hashpassword 
    });


    const token=jwt.sign({email :result.email, id :result._id },sceretkey);
    res.status(201).json({user:result, token:token});


 } catch (error) {
    console.log(error);
    res.status(500).json({message :"something went wrong"});
 }

 


 }


 const signin =async (req,res) =>{
    const {email,password}=req.body;
    try {
        const existinguser = await userModel.findOne({email :email});
        if(!existinguser)
            {
            return res.status(400).json({message :"User not found"});
        }
        const ispasswordmatch = await bcrypt.compare(password,existinguser.password);
        if(!ispasswordmatch)
            {
            return res.status(400).json({message :"Invalid Credentials"});
            }

        const token=jwt.sign({email :existinguser.email, id :existinguser._id },sceretkey);
        res.status(200).json({user:existinguser,token:token});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : "Server Down"

        });
    }
 }

 module.exports = {signup,signin};