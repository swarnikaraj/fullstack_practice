

const mongoose=require('mongoose')

const citySchema=new mongoose.Schema({
  
  name:{type:String, required:true, unique:true},
  
  citytype:{type:String, required:true},
  population:{type:Number, required:true},
  district:{type:String, required:true},
  polling_ids:[{type:mongoose.Schema.Types.ObjectId,
    ref:"polling", required:false}],
  img:{type:String, required:false},

},{
    versionKey:false,
    timestamps:true
})



module.exports=mongoose.model('city',citySchema)

