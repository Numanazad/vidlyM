/* the error middleware in Express only catches exceptions in the request processing pipeline. Any error happening
during the application startup(like connecting to mongodb) will be invisible to Express.
*/

const winston =  require('winston');

module.exports = function(err,req,res,next){
    winston.error(err.message, err);
    res.status(500).send('something failed');
}