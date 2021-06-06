const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const debug = require('debug')('app:startup');
require('dotenv').config(); 

module.exports = function(app){
    //configuration
    console.log("application name: "+ config.get('name')); 
    console.log("mail server: "+ config.get('mail.host'));
    app.use(helmet());  //look up the documentation for better understanding
    if(app.get('env')==='development'){
        app.use(morgan('tiny')); //look up the documentation for better understanding
        debug('morgan enabled');  
    }
}
