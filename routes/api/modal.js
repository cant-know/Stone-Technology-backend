const express = require('express')
const router = express.Router()

const UserInfoModel  = require("../../models/UserInfoModel");

// router.get('/ipinfo', function (req, res, next) {
//   res.json({
//     code: 200,
//     data: req.ipInfo,
//     msg: '成功'
//   });
// });

// 编辑个人信息
router.post('/edit',(req, res) => {
  if(req.headers.authorization){
    UserInfoModel.findOne({ phone: req.body.phone}).then(userInfo => {
      console.log(req.body)
      if(userInfo){
        userInfo.name = req.body.name
        userInfo.region = req.body.region
        userInfo.work = req.body.work
        userInfo.sex = req.body.sex
        userInfo.birth = req.body.birth
        userInfo.resume = req.body.resume
        console.log(userInfo)
        userInfo.save()
        res.json(userInfo)
      }else{
        const newInfo = new UserInfoModel({
          name: req.body.name,
          region: req.body.region,
          work: req.body.work,
          sex: req.body.sex,
          birth: req.body.birth,
          resume: req.body.resume,
          phone: req.body.phone
        })
        newInfo.save().then((userInfo) => {
          res.json(userInfo)
        })
      }
    })
  }
  else{
    return res.json('未找到token')
  }
})

// 获取个人信息
router.get('/getInfo',(req, res) => {
  UserInfoModel.findOne({ phone: req.query.phone }).then(userInfo => {
    res.json(userInfo)
  })
})

// 获取验证码
router.get('/code',(req, res) => {
  res.json(Math.floor(Math.random() * (9999-1000)+1000))
})

module.exports = router
