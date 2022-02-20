
const City= require('../models/city.model')

const express=require('express')

const upload=require('../middleware/upload')

const router=express.Router()


router.get('/',async(req,res)=>{

 try{
    const page=+req.query.page || 1;
    const size=+req.query.size || 8;
    const offset=(page-1)*size

  const cities=await City.find({}).skip(offset).limit(size).populate('polling_ids').lean().exec()
const total=await City.find({}).countDocuments().populate('polling_ids').lean().exec()
  res.status(200).json({data:cities,total:total})

 }


catch(err){

        res.status(400).json({message:err.message, status:"failed"})
    }

})



router.get('/all',async(req,res)=>{

    try{
       
   
     const cities=await City.find({}).lean().exec()
       
     res.status(200).json({data:cities})
   
    }
   
   
   catch(err){
   
           res.status(400).json({message:err.message, status:"failed"})
       }
   
   })
// search city with name
router.get('/filterbyname/:name',async(req,res)=>{

    

    try{
        

     const cities=await City.findOne({name:req.params.name}).populate('polling_ids').lean().exec()
   
     res.status(200).json({data:cities})
   
    }
   catch(err){
   
           res.status(400).json({message:err.message, status:"failed"})
       }
   
   })

   router.get('/population/:num',async(req,res)=>{

    

    try{
        

     const cities=await City.find({}).populate('polling_ids').lean().exec()
   

      const dta= cities.filter((e)=>{
          e.population>=req.params.num
       })

     res.status(200).json({data:dta})
   
    }
   catch(err){
   
           res.status(400).json({message:err.message, status:"failed"})
       }
   
   })




// search city with city type
   router.get('/filerbycity/:citytype',async(req,res)=>{

    try{
   
     const cities=await City.find({citytype:req.params.citytype}).lean().exec()
   const total=await City.find({citytype:req.params.citytype}).countDocuments().lean().exec()
     res.status(200).json({data:cities,total:total})
   
    }
   catch(err){
   
           res.status(400).json({message:err.message, status:"failed"})
       }
   
   })


router.post('/',upload.single("cpic"),async(req,res)=>{

    try{
   
     const cities=await City.create({
         name:req.body.name,
         citytype:req.body.citytype,
         population:req.body.population,
         district:req.body.district,
         polling_ids:req.body.polling_ids,
         img:req.file.filename

     })
   
     res.status(200).json({data:cities})
   
    }
   catch(err){
   
           res.status(400).json({message:err.message, status:"failed"})
       }
   
   })



   



   router.patch('/:cityid',upload.single("cpic"), async (req, res) => {
    try {
        const city = await City.findByIdAndUpdate(req.params.cityid, req.body, { new: true }).lean().exec();

        return res.status(201).send(city);

    } catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" });
    }
  });


router.delete('/:cityid', async (req, res) => {
    try {
        const city = await City.findByIdAndDelete(req.params.cityid).lean().exec();

        res.status(201).send(city);

    } catch (e) {
        res.status(500).json({ message: e.message, status: "Failed" })
    }
});


   






   module.exports=router