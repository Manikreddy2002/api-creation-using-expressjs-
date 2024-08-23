const express =  require('express');
const { signin, signup } = require('../controller/usercontroller');
const userRouter=require("express").Router();


userRouter.post("/signup",signup);

userRouter.post("/signin",signin) ;

module.exports=userRouter;