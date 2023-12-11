const express = require("express");

const app = express();
app.use(express.json());


app.get("/poems",async(req,res)=>{
    return res.status(200).json("It's all right folks!")
})

app.listen(3001,()=>{
    console.log("NodeJS listen on port 3001");
});