const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  phone:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  }
})

module.exports = UserModel = mongoose.model('user',UserSchema)