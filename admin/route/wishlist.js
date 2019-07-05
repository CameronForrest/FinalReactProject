var express=require("express");
var router=express.Router();
var wishlist=require("../model/wishlist");
var db=require("../util/conn");
router.get("/:id?",function (req,res) {
    if(req.params.id)
    {
        wishlist.find({movieId:req.params.id}).then(function (data) {
            var value=0;
            if(data.length>0)
            {
                value=1;
            }
            res.json(value);
        }).catch(function (err) {
            res.json(err);
        })
    }else{
        wishlist.find().then(function (data) {
            var obj={movies:data}
            res.json(obj);
        }).catch(function (err) {
            res.json(err);
        })
    }

});
router.get("/userlist/:id?",function (req,res) {
    wishlist.find({UserId:req.params.id}).then(function (data) {
        var obj={movies:data}
        res.json(obj);

    }).catch(function (err) {
        res.json(err);
    })
})
router.post("/",function (req,res) {
    var createWishlist=new wishlist({
        UserId:req.body.UserId,
        movieId:req.body.movieId,
        poster_path:req.body.poster_path,
        original_title:req.body.original_title,


    });
    createWishlist.save().then(function (savedData) {
        res.json(savedData);
    }).catch(function (err) {
        var err1={Error:"It has been added already"}
        res.json(err1);
    })
});


module.exports=router;