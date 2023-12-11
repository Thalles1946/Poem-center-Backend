const express = require("express");
const fs = require("fs")
const cors = require("cors")

const PATH0 = "./data/db.json"
const PATH1="./data/poems.json"
const app = express();
app.use(express.json());
app.use(cors({origin:true}))
const rawData = fs.readFileSync(PATH0);
const rawCompleteData = fs.readFileSync(PATH1)


const data = JSON.parse(rawData)
const completeData = JSON.parse(rawCompleteData)



app.get("/previewpoems",async(req,res)=>{ 
    return res.status(200).json(data.poemPreview)
})



app.post("/likepoem/:poemId",(req,res)=>{
    const {poemId} = req.params;
    const poemPreview = data.poemPreview
    var modifiedData = poemPreview;

    poemPreview.find((poem,index)=>{  
        if(poem.idLink===poemId){
            console.log(modifiedData[index].like);
            modifiedData[index].like = !modifiedData[index].like
        }
    });
    const dadosModificados = JSON.stringify({"poemPreview":modifiedData},null,2)
    fs.writeFileSync(PATH0,dadosModificados)
    
    res.status(201).send(dadosModificados)
})

app.get("/poem/:poemId",(req,res)=>{
    const {poemId} = req.params;

    const poems = completeData.poems;
    const poem = poems.find((poem)=>poem.idLink===poemId)
    res.status(201).send(poem)
})

app.listen(3001,()=>{
    console.log("NodeJS listen on port 3001");
});