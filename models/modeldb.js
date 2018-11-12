const mongoose = require('mongoose');
const Joi = require('joi');
  
const Regdata = mongoose.model('Regdata', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  emailId: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  phoneNo: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  datetime: {
	type: String,
  },
  
}));


function validateGenre(regdata) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    emailId: Joi.string().min(5).max(50).required(),
    phoneNo: Joi.string().min(5).max(15).required(),
  };

  return Joi.validate(regdata, schema);
}



exports.Regdata = Regdata; 
exports.validateGenre = validateGenre; 