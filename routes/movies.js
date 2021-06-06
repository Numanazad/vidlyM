const { Movie, validate }= require('../models/movies');
const { Genre }= require('../models/genre');
const mongoose = require('mongoose');
const express =require('express');
const router = express.Router();

router.get('/', async (req,res)=>{
    const movies = await Movie.find().sort('name');
    res.send(movies);
});

router.post('/',async (req,res)=>{
    //joi validation
    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    //validate genre
    const genre = await Genre.findById(req.body.genreId); // I am not sure how this works
    if(!genre) res.status(404).send("genre with the id is not found");

    //input movie
    let movie = new Movie({
        title:req.body.title,
        genre:{
            _id:genre._id,
            name:genre.name
        },
        numberInStock:req.body.numberInStock,
        dailyRentalRate:req.body.dailyRentalRate
    });
    movie = await movie.save();

    res.send(movie);
});

router.put('/:id',async (req,res)=>{
    //joi validation
    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);

    //validate genre
    const genre = await Genre.findById(req.body.genreId); // I am not sure how this works
    if(!genre) res.status(404).send("genre with the id is not found");

    //update request
    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            title:req.body.title,
            genre:req.body.genre,
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        }, {new:true});

    movie.title = req.body.title;
    movie.genre = req.body.genre;
    movie.numberInStock = req.body.numberInStock;
    movie.dailyRentalRate = req.body.dailyRentalRate;

    res.send(movie);
});

router.delete('/:id',async (req,res)=>{
    //validate genre
    const genre = await Genre.findByIdAndUpdate(req.body.genreId); // I am not sure how this works
    if(!genre) res.status(404).send("genre with the id is not found");

    const movie = await Movie.findByIdAndRemove(req.params.id);
    if(!movie) res.status(404).send('movie with given id not found');

    res.send(movie);
});

router.get('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    //validate genre
    const genre = await Genre.findByIdAndUpdate(req.body.genreId); // I am not sure how this works
    if(!genre) res.status(404).send("genre with the id is not found");

    const movie = await Movie.findByIdAndUpdate(req.params.id);
    if(!movie) res.status(404).send('movie with given id not found');
    res.send(movie);
});

module.exports = router;
