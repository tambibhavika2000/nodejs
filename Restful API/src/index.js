const express=require('express');
const app=express();
require("./db/conn");
const Student=require("./models/students");
const port = process.env.PORT || 3000;

app.use(express.json());

// handling post requests 
app.post("/student",async (req,res)=>{
    try{
        const user = new Student(req.body);
    const createUser= await user.save();
    res.send(createUser);
    }catch(e){
        res.send(e);
    }
    
});

//handling get requests
app.get("/student",async(req,res)=>{
    try{
        const user= await Student.find({});
        res.send(user);
    }catch(e){
        res.send(e);
    }
})

//handling get requests using id
app.get("/student/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const studentdata= await Student.findById(_id);
        console.log(studentdata);
        res.send(studentdata);
    }catch(e){
        res.send(e);
    }
})

//handling update requests
app.patch("/student/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const updatestudent=await Student.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        res.send(updatestudent);
        
    }catch(e){
        res.send(e);
    }
})

//handling delete requests
app.delete("/student/:id",async(req,res)=>{
    try{
        const _id=req.params.id;
        const deletestudent=await Student.findByIdAndDelete(_id);
        res.send(deletestudent);
        
    }catch(e){
        res.send(e);
    }
})

app.listen(port ,()=>{
    console.log("Listening");
})