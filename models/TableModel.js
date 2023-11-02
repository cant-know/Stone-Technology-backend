const mongoose  = require("mongoose");
const Schema = mongoose.Schema

const TableSchema = new Schema({
  id:{
    type: Number,
    required: true
  },
  name:{
    type: String,
    required: true
  },
  age:{
    type: Number,
    required: true
  },
  gender:{
    type: [],
    required: true
  },
  email:{
    type: String,
    required: true
  },
  phone:{
    type: String,
    required: true
  },
})

module.exports = TableModel = mongoose.model('table',TableSchema)