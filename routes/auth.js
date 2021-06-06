const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const Joi = require('joi');
const { User } = require('../models/users');
const express = require('express');
const router = express.Router();

router.post('/',async (req,res)=>{
    // joi validation
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // if user not registered
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('invalid email or password');

    // bcrypt validation
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('wrong username or password');
    // successful
    const token = user.generateAuthToken();

    res.send(token);
});

function validate(req){
    const schema = {
        email:Joi.string().required().min(5).max(255).email(),
        password:Joi.string().required().min(5).max(255)
    };
    return Joi.validate(req,schema);
}

module.exports = router;