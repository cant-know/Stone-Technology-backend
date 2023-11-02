const express  = require("express");
const router = express.Router();
const jwt  = require("jsonwebtoken");
const passport = require("passport");
const keys  = require("../../config/keys");

const UserModel  = require("../../models/UserModel");

// 注册业务
router.post('/register',(req, res) => {
  UserModel.findOne({phone: req.body.phone}).then(user => {
    if(user){
      res.json('邮箱已被占用！')
    }else{
      const newUser = new UserModel({
        phone: req.body.phone,
        password: req.body.password,
      })
      newUser.save().then(user => {
        console.log('添加成功')
        res.json(user)
      })
    }
  })
})

// 登录业务
router.post('/login',(req, res) => {
  UserModel.findOne({phone: req.body.phone}).then(user => {
    if(!user){
      return res.status(404).json('用户不存在')
    }
    if(user.password != req.body.password){
      return res.status(400).json('密码错误')
    }
    jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (6000000000 * 60000000000),
      data: 'foobar'
    },keys.keyOrSecret,(err, token) => {
      // if(err) return err;
      // console.log('执行了')
      return res.json({
        status: 200,
        token:"Bearer " +  token
      })
    })
  })
})

// 登录验证业务
router.get('/test',passport.authenticate('jwt',{session: false}),(req, res) => {
  res.json('验证通过')
})

// 修改密码
router.post('/password',(req, res) => {
  UserModel.findOne({phone:req.body.phone}).then(user => {
    user.password = req.body.password
    user.save()
    res.json(user)
  })
})

module.exports = router