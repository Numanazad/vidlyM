const asyncMiddleware = require('../middleware/async');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require("express");
const router = express.Router(); 

router.get('/',asyncMiddleware(async (req,res)=>{
        const genre = await Genre.find();
        res.send(genre);
}));
router.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('not found');
    res.send(genre);
});

router.post('/', auth ,asyncMiddleware(async (req,res)=>{
    const { error } = validate(req.body);  //object destructuring equivalent to result.error
    if(error) return res.status(400).send(error.details[0].message);
          
      let genre = new Genre({ name:req.body.name });
      genre = await genre.save();
      res.send(genre)
}));
  
router.put('/:id',async (req,res)=>{
    const { error } = validate(req.body);  //object destructuring equivalent to result.error
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name},{new:true})
    //look the genre if it exists
    //if not 404 not found 
    if(!genre) return res.status(404).send('not found');
    
    //Validate
    //if not validate than 400 bad request
    //const result = validategenre(req.body);
    
    //Update course
    //return the updated course
    genre.name = req.body.name;
    res.send(genre);
});


router.delete('/:id', [auth, admin] ,async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    //look if the genre with the id exists
    //if not send 404 not found 
    if(!genre) return res.status(404).send('not found');

    //return the same genre
    res.send(genre);
});  


module.exports = router;