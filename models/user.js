const mongoose=require("mongoose")
const UserSchema=mongoose.Schema({
    name:{
        type:String,
       required:true
    },
    email:String,
    adress:String,
})
module.exports=mongoose.model("User",UserSchema);