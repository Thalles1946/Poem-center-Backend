const express = require("express");
const fs = require("fs")
const cors = require("cors")

const PATH = "./data/db.json"
const app = express();
app.use(express.json());
app.use(cors({origin:true}))
const rawData = fs.readFileSync(PATH);

const data = JSON.parse(rawData)



app.get("/previewpoems",async(req,res)=>{ 
    return res.status(200).json(data.poemPreview)
})

app.get("/poem/:poemId",(req,res) => {
    const {poemId} = req.params;
    const poemPreview = data.poemPreview
    const poem = poemPreview.find((poem)=> poem.idLink===poemId);
    res.status(200).send(poem)
})

app.post("/likepoem/:poemId",(req,res)=>{
    const {poemId} = req.params;
    const poemPreview = data.poemPreview
    var modifiedData = poemPreview;

    poemPreview.find((poem,index)=>{  
        console.log(poem.idLink,"indexed",poemId);
        if(poem.idLink===poemId){
            console.log(modifiedData[index].like);
            modifiedData[index].like = !modifiedData[index].like
        }
    });
    const dadosModificados = JSON.stringify({"poemPreview":modifiedData},null,2)
    console.log(modifiedData);
    fs.writeFileSync(PATH,dadosModificados)
    
    res.status(201).send(dadosModificados)
})

app.listen(3001,()=>{
    console.log("NodeJS listen on port 3001");
});