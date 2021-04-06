const mongoose = require("mongoose");
const validator = require("validator");

//defining schema and validators
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3 },
    email: {
        type: String, required: true, unique: [true, "Email already Present"],
        validate(value) { if (!validator.isEmail(value)) { throw new Error("Enter valid Email"); } }},
    phone: {type: Number, min:10, required: true,unique:true},
    address:{type:String,required: true}
})

const Student=new mongoose.model('Student',studentSchema);
module.exports =Student;

