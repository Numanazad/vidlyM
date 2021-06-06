const mongoose = require('mongoose');
const winston = require('winston');

module.exports = function(){
    // connect to database
    mongoose.connect('mongodb://localhost/vidly',{useNewUrlParser:true,useUnifiedTopology:true})
        .then(()=>winston.info('conn to db...'));
}