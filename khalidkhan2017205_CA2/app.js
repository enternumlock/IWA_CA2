var express         = require("express"),
    bodyParser      = require("body-parser"),
    path            = require("path"),
    methodOverride  = require("method-override"),
    mongoose        = require("mongoose");

    require("dotenv").config();
    
var StdDB           = require("./models/studentDB");

var app             = express();

//requring routes
var studentRoutes   = require("./routes/students");

  // create and connect to database
mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
	}).then(function(){
		console.log("connected to DB");
	}).catch(function(err){
		console.log("ERROR: ", err.message);
});

app.set("views", path.join(__dirname, "/views/"));
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

app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    console.log("SERVER RUNNING");
});
