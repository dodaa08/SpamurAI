const mongoose = require('mongoose');


const user = new mongoose.Schema({
    email: {type : String , unique : true, required : true},
    password: String
});

  
  // Create the model for the settings collection
  
  const User = mongoose.model('User', user);
  

module.exports = User;