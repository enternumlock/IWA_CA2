var express = require("express");
var router  = express.Router();
var StdDB   = require("../models/studentDB");

// Routes

// this take us to index.ejs page
router.get("/students" , function(req, res){
    StdDB.find({}, function(err, myData){
        if(err){
            console.log("ERROR : " + err);
        }else{
            res.render("student/index", {data:myData} );
        }
    })
});

// new route == it will take us to new.ejs and dislay a form to fill
router.get("/students/new" , function(req,res){
    res.render("student/new");
});
// create route == we will create new student record and redirect it to /students
router.post("/students", function(req,res){
    // req.body.student.body = req.sanitize(req.body.student.body);
    StdDB.create(req.body.student, function(err, newStudent){
        if(err){
            res.render("student/new");
        }else{
            res.redirect("/students");
        }
    });
});

// Show route == it will take us to show template
router.get("/students/:id" , function(req,res){
    // res.send("SHOW PAGE")
    StdDB.findById(req.params.id, function(err, foundstudent){
        if(err){
            res.redirect("/students");
        }else{
            res.render("student/show", {data: foundstudent});
        }
    });
});
// =========================================>
// Edit route == it will take us to Edit form
router.get("/students/:id/edit", function(req,res){
    // first find id of student
    StdDB.findById(req.params.id, function(err, foundstudent){
        if(err){
            res.redirect("/students");
        }else{
            res.render("student/edit", {data: foundstudent});
        }
    });
});

// update route
router.put("/students/:id", function(req,res){
    // req.body.student.body = req.sanitize(req.body.student.body);
    StdDB.findByIdAndUpdate(req.params.id, req.body.student, function(err, updatedStudent){
        if(err){
            res.redirect("/students");
        }else{
            res.redirect("/students/" + req.params.id);
        }
    });
});

// Delete route
router.delete("/students/:id", function(req,res){
    StdDB.findByIdAndRemove(req.params.id , function(err){
        if(err){
            res.redirect("/students");
        }else{
            res.redirect("/students");
        }
    });
});

module.exports = router;