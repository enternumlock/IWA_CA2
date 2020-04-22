var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
   rollNo: String,
   fName: String,
   lName: String,
   programming: String,
   webdevelopment: String,
   networking: String,
   bigdatabase: String
});

module.exports = mongoose.model("Student", studentSchema);