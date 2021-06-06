const winston = require('winston'); 

module.exports = function(){
    /*
    unhandled rejection or unexception using 
    process.on()
    */
    process.on('uncaughtException', (ex)=>{
        winston.transports.Console({ colorize:true, prettyPrint:true });
        winston.error(ex.message, ex);
        process.exit(1);
    });

    process.on("unhandledRejection", (ex)=>{
        winston.error(ex.message, ex);
        process.exit(1);
    });

    winston.add(new winston.transports.File({ filename:"logfile.log" }));
}