const express = require("express");
const fs = require("fs")
const cors = require("cors")

const PATH = "./data/db.json"
const app = express();
app.use(express.json());
app.use(cors({origin:true}))




app.get("/previewpoems",async(req,res)=>{

    const rawData = fs.readFileSync(PATH);

    const data = JSON.parse(rawData)
    
    return res.status(200).json(data.poemPreview)
})

app.listen(3001,()=>{
    console.log("NodeJS listen on port 3001");
});