const express =require('express');
const app = express();
const userRouter = require("./routes/userroutes");
const noteRouter = require("./routes/noteroutes");
const mongoose =require('mongoose');


app.use(express.json());
app.use((req,res,next) =>{
    console.log("Http method :"+ req.method + ", URL :"+ req.url);
    next();
})

app.use("/users",userRouter);
app.use("/Note",noteRouter)


mongoose.connect("mongodb+srv://Manik:1906@cluster0.rwdgm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() =>{
    app.listen(5000,()=>{
        console.log("server is started on 5000 port")
    });
})

.catch((error) => {
    console.log("error");
});
