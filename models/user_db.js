const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
 
const uschema = new mongoose.Schema({
    name: {
      type: String, required: true, minlength: 5,  maxlength: 50
    },
    emailId: {
      type: String, required: true, minlength: 5, maxlength: 50, unique:true,
	  },
    phoneNo: {
      type: String, required: true, minlength: 5, maxlength: 50, unique:true,
    },
    password: {
        type: String, required: true, minlength: 5, maxlength: 1024,
		},
    note: {
        type: String, minlength: 3, maxlength: 2048,
		},
    datetime: {
		type: String, minlength: 5, maxlength: 50,  default: Date.now(),
    },
	status: {
    type: Boolean,  default: false
  }, 
});

uschema.methods.generateAuthToken = function() {
  const jwtPrivatKey = process.env.JWT_TOKEN;
  const token = jwt.sign({ _id: this._id, emailId:this.emailId, phoneNo : this.phoneNo  }, jwtPrivatKey, { expiresIn: '5h' });
  return token;
}

const Userdata = mongoose.model('Userdata', uschema );

function validateUser(users) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    emailId: Joi.string().min(5).max(50).required().email(),
    phoneNo: Joi.string().min(5).max(15).required(),
    password: Joi.string().min(5).max(15).required(),
  };

  return Joi.validate(users, schema);
}




exports.Userdata = Userdata; 
exports.validateUser = validateUser; 