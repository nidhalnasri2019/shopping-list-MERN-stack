const express = require('express')

const itemsRoute = express.Router();
// item model

const Item = require('../../models/Item')

//@route Get api/items
//@desc Get all Items
//@access Public
itemsRoute.get('/',(req,res)=>{
    Item.find()
    .sort({ date: -1})
    .then(items => res.json(items))
})


//@route Post api/items
//@desc  create item
//@access Public
itemsRoute.post('/',(req,res)=>{
   const newItem = new Item({
       name: req.body.name
   });
    newItem.save().then(item=>res.json(item)); 
})

//@route Delete api/items/:id
//@desc  delete Post
//@access Public
itemsRoute.delete('/:id',(req,res)=>{
  Item.findById(req.params.id)
  .then(item => item.remove().then(()=>res.json({success :true})))
  .catch(err => res.status(404).json({success :false}))
})


module.exports = itemsRoute