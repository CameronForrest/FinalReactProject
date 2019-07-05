var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const Auth=Schema({
    First: { type: String, required: true },
    Last: { type: String, required: true },
    Email: { type: String, required: true,unique: true },
    Password: { type: String, required: true },

})
module.exports=mongoose.model("Auth",Auth);