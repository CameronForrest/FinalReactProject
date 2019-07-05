var express=require("express");
var router=express.Router();
var auth=require("../model/auth");
var db=require("../util/conn");
router.get("/:id?",function (req,res) {
    if(req.params.id)
    {
        auth.find({_id:req.params.id}).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        })
    }else{
        auth.find().then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
        })
    }

});

router.post("/",function (req,res) {
    var createAuth=new auth({
        First:req.body.First,
        Last:req.body.Last,
        Email:req.body.Email,
        Password:req.body.Password,


    });
    createAuth.save().then(function (savedData) {
        res.json(savedData);
    }).catch(function (err) {
        var err1={Error:err.message};
        res.json(err1);
    })
});

router.post("/login",function (req,res) {
    auth.findOne({Email:req.body.Email,Password:req.body.Password}).then(function (data) {
        if(data==null)
        {
            var senddata={Error:"Username Or password is not found"};
            res.json(senddata);
        }else {
            res.json(data);
        }

    }).catch(function (err) {
        res.json(err);
    })
});
module.exports=router;