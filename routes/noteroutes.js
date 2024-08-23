const express = require('express');
const noteRouter=require("express").Router();

noteRouter.get("/",(req,res) => {
    res.send("note get request");
});

noteRouter.post("/",(req,res) => {
    res.send("note post request");

});


module.exports=noteRouter;
