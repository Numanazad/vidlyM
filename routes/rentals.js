const{Rental, validate} = require('../models/rentals');
const {Movie} = require('../models/movies');
const {Customer} = require('../models/customers');
const mongoose = require('mongoose');
const Fawn = require('fawn');
const express = require('express');
const router =  express.Router();

Fawn.init(mongoose);

router.get('/',async (req,res)=>{
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req,res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('customer of id not found');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('movie of id not found');

    if(movie.numberInStock === 0) return res.status(400).send('movie not in stock');

    let rental = new Rental({
        customer:{
            _id:customer._id,
            name:customer.name,
            phone:customer.phone
        },
        movie:{
            _id:movie._id,
            title:movie.title,
            dailyRentalRate:movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
        .save('rentals',rental)
        .update('movies', { _id:movie._id }, {
            $inc:{numberInStock:-1}
        })
        .run();
        
        res.send(rental);
    } catch (error) {
        res.status(500).send('something failed')
    }
});

router.get('/:id', async (req,res)=>{
    const rental = await Rental.findById(req.params.id);

    if(!rental) return res.status(404).send('the rental with the given id not found');
    
    res.send(rental);
})
module.exports = router;