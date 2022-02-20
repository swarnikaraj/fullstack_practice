
const Polling= require('../models/polling.model')

const express=require('express')

const router=express.Router()


router.get('/',async(req,res)=>{

 try{

  const polling=await Polling.find({}).lean().exec()

  res.status(200).json({data:polling})

 }
catch(err){

        res.status(400).json({message:err.message, status:"failed"})
    }

})
router.get('/stations/:city_name',async(req,res)=>{

    try{
   
     const polling=await Polling.find({city_name:req.params.city_name}).lean().exec()
       
     const num=await Polling.find({city_name:req.params.city_name}).countDocuments().lean().exec()
     res.status(200).json({data:polling,total:num})
   
    }
   catch(err){
   
           res.status(400).json({message:err.message, status:"failed"})
       }
   
   })




router.post('/',async(req,res)=>{

    try{
      
        
     const polling=await Polling.create({name:req.body.name,
        address:req.body.address,
        pincode:req.body.pincode,

        city_name:req.body.city_name}
       )
   
     res.status(200).json({data:polling})
   
    }
   catch(err){
   
           res.status(400).json({message:err.message, status:"failed"})
       }
   
   })


   module.exports=router