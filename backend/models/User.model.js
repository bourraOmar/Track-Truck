const mongoose = require('mongoose');

const roles = ['Admin', 'Driver'];

const userSchema = new mongoose.Schema({
  email : {
    type : String,
    require : true,
    unique : true,
    trim : true,
    lowercase : true,
  },
  password : {
    type : String,
    required : true,
    minlength : 6,
  },
  role : {
    type : String,
    emun : roles,
    default : 'Driver',
    require : true,
  },
  firstName : {
    type : String,
    require : true,
  },
  lastName : {
    type : String,
    require : true,
  },
  timestamps : true,

})

const User = mongoose.model('User', userSchema);

module.exports = User;