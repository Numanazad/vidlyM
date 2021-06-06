const { Customer, validate } = require('../models/customers');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router(); 

router.get('/',async (req,res)=>{ 
    const customer = await Customer.find();
    res.send(customer);
});
router.post('/',async (req,res)=>{
    //joi validation
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    });

    customer = await customer.save();
    res.send(customer);
});
router.put('/:id', async (req,res)=>{
    //Joi validation
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //update first approach
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            isGold:req.body.isGold, 
            name:req.body.name, 
            phone:req.body.phone
        }, {new:true});
    
    // if the customer does not exist 
    if(!customer) return res.status(404).send('customer with the given id not found');

    // if exists update with validation
    // have a little doubt if this is necessary
    customer.isGold=req.body.isGold;
    customer.name= req.body.name;
    customer.phone= req.body.phone;

    res.send(customer);
});
router.delete('/:id', async(req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('customer not found');

    res.send(customer);
});
router.get('/:id',async(req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('customer not found');

    res.send(customer);
});

module.exports = router;