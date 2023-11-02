const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserInfoSchema = new Schema({
  name:{
    type:String
  },
  region:{
    type:String
  },
  work:{
    type:[]
  },
  sex:{
    type:String
  },
  birth:{
    type:String
  },
  resume:{
    type:String
  },
  phone:{
    type:String
  }
})

module.exports = UserInfoModel = mongoose.model('userInfo',UserInfoSchema)