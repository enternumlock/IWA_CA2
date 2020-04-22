var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    StdDB = require("./models/studentDB");

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

app.set("view engine" , "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
    res.render("index");
});


app.listen(3000, function(){
    console.log("SERVER RUNNING");
})
