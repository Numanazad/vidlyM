const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    isGold:{
        type:String,
        default:false
    },
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    phone:{
        type:String,
        required:true,
    }
});
const Customer = mongoose.model('Customer',customerSchema);

function validateCustomer(customer){
    const schema = {
        name:Joi.string().min(5).max(50),
        phone:Joi.number()
    }
    return Joi.validate(customer,schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;