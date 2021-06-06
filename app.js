const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/routes')(app);
require('./startup/logging')(); 
require('./startup/config')(app);
require('./startup/db')();
require('./startup/validation')();
/* 
require('winston-mongodb');
*/
const port = process.env.PORT || 4000;
app.listen(port,(err)=>{
    if(err) throw err;
    winston.info(`Listening to ${port}...`);
});