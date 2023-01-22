require('dotenv').config()
const express=require("express");
const app=express();
const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE,{ useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    if(err)
    console.log(err)
    else
    console.log("connectesd to db")
})
app.use(express.json())
const user=require("./models/user")
//return all users
app.get("/users",async(req,res)=>{
    try{
    const users=await user.find()
    res.json(users)}
    catch(e){res.status(500).json({message:error})}
})
//add a new user
app.post("/add",async(req,res)=>{
    const newuser=new user(
        {name:req.body.name
        ,email:req.body.email,
        adress:req.body.adress})
    try{
        await newuser.save();
        res.status(201).json(newuser);
    }catch(error){res.status(400).json({message:error.message})}
}
)
//edit a user by id
app.put("/:id", founduser,async(req,res)=>{
    try{
    if(req.body.name!=null)
    res.found.name=req.body.name
    else{
        if(req.body.email!=null){
            res.found.email=req.body.email
        }
    }
    await res.found.save()
    res.json(res.found)
    }catch(error){res.status(400).json({message:"passing unacceptable info"})}
})
 //delete by id
 app.delete("/:id",founduser,async(req,res)=>{
    try{
    await user.deleteOne({_id:res.found.id})
    res.json(res.found)}
   catch{
    res.status(500).json({message:"not deleted"})
   }
 })

//middlewear to find user by id
async function founduser(req,res,next){
    try{
        let founduser=await user.findById(req.params.id)
        if (founduser==null){
            return res.status(404).json({message:"not found"})
        }
        else{
            res.found=founduser
        }
    }catch(error){
        return res.status(500).json({message:"error in the server"})
    }
    next()
}

app.listen(process.env.PORT,()=>{console.log("connected")});
// founduser,async(req,res)=>{
//     try{
//       res.founduser.name=req.name
//       await res.founduser.save()
//     }catch(error){console.log(error)}
// }