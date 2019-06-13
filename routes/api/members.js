const express= require('express');
const router=express.Router();

//Member Model
const Member =require('../../models/Member');

// get api/member
router.get('/',(req,res)=>{
    Member.find()
    .sort({date:-1})
    .then(members=>res.json(members))
    });

    //@route Post api/items  

router.post('/',(req,res)=>{
    console.log(req.body,'hekklo')
    const newMember = new Member({
        name:req.body.name,
        status:req.body.status
    })
    newMember.save()
   .then(Member=>res.json(Member));
     });

//@route Delete api/items/:id   

router.delete('/:id',(req,res)=>{
    Member.findById(req.params.id)
    .then(member=>member.remove()
    .then(()=>res.json({success:true})))
    .catch(err=>res.status(404).json({success:false}));
     })

module.exports=router;