var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var cors = require('cors')
app.use(cors())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))
//routing
var auth=require("./route/auth");
app.use("/auth/",auth);
var wishlist=require("./route/wishlist");
app.use("/wishlist/",wishlist);
app.listen(3322,function () {
    console.log("listening at port : " +3322);
})
