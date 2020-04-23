var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    StdDB = require("./models/studentDB");

var app = express();

//requring routes
var studentRoutes    = require("./routes/students");

  // create and connect to database
mongoose.connect("mongodb+srv://khalid:pass2017205@mymongodbcluster-f4oa8.mongodb.net/studentDB?retryWrites=true&w=majority" , {
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
app.use(methodOverride("_method"));

// this redirects us to students route
app.get("/", function(req,res){
    res.render("landing");
});
// use routes
app.use(studentRoutes);

app.listen(3000, function(){
    console.log("SERVER RUNNING");
});
