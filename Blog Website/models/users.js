const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique : true
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  profileImageURL : {
    type : String,
    default : '/img/avatar.png'
  },
  role : {
    type : String,
    enum : ["USER" , "ADMIN"],
    default : "ADMIN"
  }
},{ timestamp : true}
);


const user = mongoose.model('users',userSchema)
module.exports = user