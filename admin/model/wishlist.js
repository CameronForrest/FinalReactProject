var mongoose=require("mongoose");
var Schema=mongoose.Schema;
const Wishlist=Schema({
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth'
    },
    movieId: { type: String, required: true,unique: true },
    poster_path: { type: String, required: true },
    original_title: { type: String, required: true },

})
module.exports=mongoose.model("Wishlist",Wishlist);