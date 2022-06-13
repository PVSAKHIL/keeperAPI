// jshint.esversion6
const express=require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
const cors=require("cors");

const app=express()

app.use(bodyParser.json())
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
 app.use(cors(corsOptions))

mongoose.connect('mongodb://localhost:27017/keeper',{useNewUrlParser: true})
const keeperSchema=mongoose.Schema({
    title: String,
    content: String
})
const Note=mongoose.model("notes",keeperSchema)

app.get("/getnotes",(req,res)=>{
    Note.find({},(err,docs)=>{
        res.json({notes: docs})
    })
})
app.post("/addnote",(req,res)=>{
    const note=new Note({
        title: req.body.title,
        content: req.body.content
    })
    note.save()
    console.log(note)
    res.json({_id: note._id,title: note.title,content: note.content})
})

app.post("/deletenote",(req,res)=>{
    Note.deleteOne({"_id": req.body._id},(err,docs)=>{
        if(err){
            console.log("err",err)
        }
        else{
            console.log("docs",docs)
        }
    })
    res.json({status: "success"})
})
app.post("/",(req,res)=>{
    res.send("<h1>the sum is" +String(Number(req.body.num1)+Number(req.body.num2))+"</h1>")
    console.log(req)
})

app.listen(3001,()=>{
    console.log("hello world")
});