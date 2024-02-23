const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String,
          required: [true, "is required"],
          unique: true,
          validate: {
           validator: function(str){
             return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(str);
           },
           message: props => `${props.value} is not a valid email`
         }
         },
  password: { 
    type: String,
    required: [true, "is required"],
    minlength: [6, "must be at least 6 characters long"],
             },
});

module.exports = mongoose.model("User", userSchema);
