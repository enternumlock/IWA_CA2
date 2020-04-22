var express = require("express"),
    bodyPAerser = require("body-parser"),
    mongoose = require("mongoose");

var app = express();

  // create and connect to database
mongoose.connect("mongodb+srv://khalid:pass2017205@mymongodbcluster-f4oa8.mongodb.net/test?retryWrites=true&w=majority" , {
		useNewUrlParser: true,
		useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
	}).then(function(){
		console.log("connected to DB");
	}).catch(function(err){
		console.log("ERROR: ", err.message);
});


app.get("/" , function(req,res){
    res.send("INDEX PAGE")
});


app.listen(3000, function(){
    console.log("SERVER RUNNING");
})
