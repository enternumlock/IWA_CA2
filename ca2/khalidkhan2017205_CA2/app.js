var express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    StdDB = require("./models/studentDB");

var app = express();

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

// this take us to index.ejs page
app.get("/students" , function(req, res){
    StdDB.find({}, function(err, myData){
        if(err){
            console.log("ERROR : " + err);
        }else{
            res.render("index", {data:myData} );
        }
    })
});

// new route == it will take us to new.ejs and dislay a form to fill
app.get("/students/new" , function(req,res){
    res.render("new");
});
// create route == we will create new student record and redirect it to /students
app.post("/students", function(req,res){
    
    StdDB.create(req.body.student, function(err){
        if(err){
            res.render("new");
        }else{
            res.redirect("/students");
        }
    });
});

// Show route == it will take us to show template
app.get("/students/:id" , function(req,res){
    // res.send("SHOW PAGE")
    StdDB.findById(req.params.id, function(err, foundstudent){
        if(err){
            res.redirect("/students");
        }else{
            res.render("show", {data: foundstudent});
        }
    });
});

// =========================================>
// Edit route == it will take us to Edit form
app.get("/students/:id/edit", function(req,res){
    // first find id of student
    StdDB.findById(req.params.id, function(err, foundstudent){
        if(err){
            res.redirect("/students");
        }else{
            res.render("edit", {data: foundstudent});
        }
    });
});

// update route
app.put("/students/:id", function(req,res){

    StdDB.findByIdAndUpdate(req.params.id, req.body.student, function(err, updatedStudent){
        if(err){
            res.redirect("/students");
        }else{
            res.redirect("/students/" + req.params.id);
        }
    });
});

// Delete route
app.delete("/students/:id", function(req,res){
    StdDB.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/students");
        }else{
            res.redirect("/students");
        }
    });
});

app.listen(3000, function(){
    console.log("SERVER RUNNING");
});
