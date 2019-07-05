var mongoose=require("mongoose");
var config=require("../config.json");

mongoose.connect(config.mongodatabaseConnection,{ useNewUrlParser: true });
//mongoose.Promise=global.Promise;
module.exports={
    'Auth':require("../model/auth"),
    'Wishlist':require("../model/wishlist")


}