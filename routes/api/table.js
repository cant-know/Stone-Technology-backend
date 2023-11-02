const Mock  = require("mockjs");
const express  = require("express");
const TableModel  = require("../../models/TableModel");

const router = express.Router()

router.get('/mock',(req, res) => {
  const data = Mock.mock({
    'list|1000-2000': [{
      'id|+1': 1,
      'name': '@cname',
      'age|18-60': 1,
      'gender|1': ['男', '女'],
      'email': '@email',
      'phone': /^1[3456789]\d{9}$/
    }]
  });
  res.json(data);
})

router.get('/data',(req, res) => {
  TableModel.find().then(table => {
    table = table.slice(((req.query.pageIndex - 1) * req.query.pageSize),req.query.pageIndex * req.query.pageSize)
    table.map((item) => {
      return item.gender.toString()
    })
    res.json(table)
  })
})

router.get('/allData',(req, res) => {
  TableModel.find().then(all => {
    res.json(all.length)
  })
})

let oldId = 1857
router.post('/edit',(req, res) => {
  if(req.body.id){
    console.log(req.body)
    TableModel.findOne({id: req.body.id}).then(person => {
      person.name = req.body.name,
      person.gender = req.body.gender,
      person.age = req.body.age,
      person.email = req.body.email,
      person.phone = req.body.phone,
      person.save()
      res.json(person)
    })
  }else{
    oldId++
    let newPerson = new TableModel({
      id: oldId,
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      email: req.body.email,
      phone: req.body.phone,
    })
    newPerson.save().then(() => {
      res.json(newPerson)
    })
  }
})

router.post('/delete',(req, res) => {
  TableModel.deleteOne({id: req.body.id}).then(person => {
    res.json(person)
  })
})

module.exports = router

