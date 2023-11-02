const express  = require("express");
const bodyParser  = require("body-parser");
const mongoose  = require("mongoose");
const passport = require("passport");
const expressIp  = require("express-ip");

const app = express()

const db  = require("./config/keys").mongoURL;

const user  = require("./routes/api/user");
const modal  = require("./routes/api/modal");
const table  = require("./routes/api/table");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(db,{ useNewUrlParser: true }).then(()=>{
  console.log('mongodb连接成功')
}).catch((e) => {
  console.log(e)
})

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(expressIp().getIpInfoMiddleware)

app.use('/api/user',user)
app.use('/api/modal',modal)
app.use('/api/table',table)

app.listen(1112,()=>{
  console.log('服务器运行在1112端口')
})