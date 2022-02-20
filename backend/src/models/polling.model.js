

const mongoose=require('mongoose')

const pollingStationSchema=new mongoose.Schema({
  name:{type:String, required:true, unique:true},
  address:{type:String, required:true},
  pincode:{type:String, required:true},
  
 city_name:{type:String, required:true},
 
},{
    versionKey:false,
    timestamps:true

 })
module.exports=mongoose.model('polling',pollingStationSchema)

