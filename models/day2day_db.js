const mongoose = require('mongoose');
const Joi = require('joi');

const day2dayPaymentTypeSchema =  new mongoose.Schema({
									user_id: {
									  type: String, required: true, minlength: 1,  maxlength: 1024
									},
									type_name: {
									  type: String, required: true, minlength: 5,  maxlength: 50
									},
									user_note: {
										type: String, minlength: 3, maxlength: 2048,
										},
									system_note: {
										type: String, minlength: 3, maxlength: 2048,
										},
									datetime: {
										type: String, minlength: 5, maxlength: 50,  default: Date.now(),
									},
									status: {
									type: Boolean,  default: true
								  }, 
								});

const Day2dayPaymentType = mongoose.model('Day2dayPaymentType', day2dayPaymentTypeSchema );

function validateday2dayPaymentType(day2dayPaymentTypeInfo) {
  const schema = {
    type_name: Joi.string().min(5).max(50).required(),
    user_note: Joi.string().min(5).max(2040).required(),
  };		
  return Joi.validate(day2dayPaymentTypeInfo, schema);
} 

  
  
  
const day2dayPaymentEntrySchema =  new mongoose.Schema({
									user_id: {
									  type: String, required: true, minlength: 5,  maxlength: 1024
									},
									day2day_info: {
									  type: String, required: true, minlength: 5,  maxlength: 50
									},
									day2day_amount: {
									  type: String, required: true, minlength: 5,  maxlength: 50
									},
									day2dayPaymentType_id: {
									  type: String, required: true, minlength: 5,  maxlength: 1024
									},
									user_note: {
										type: String, minlength: 3, maxlength: 2048,
										},
									system_note: {
										type: String, minlength: 3, maxlength: 2048,
										},
									datetime: {
										type: String, minlength: 5, maxlength: 50,  default: Date.now(),
									},
									status: {
									type: Boolean,  default: true
								  }, 
								});

const Day2dayPaymentEntry = mongoose.model('Day2dayPaymentEntry', day2dayPaymentEntrySchema );


function validateday2dayPaymentEntry(day2dayPaymentEntryInfo) {
  const schema = {
    day2day_info: 			Joi.string().min(5).max(50).required(),
    day2day_amount: 		Joi.string().min(5).max(50).required(),
    day2dayPaymentType_id: 	Joi.string().min(1).max(1020).required(),
    user_note: 				Joi.string().max(2040),
  };		
  return Joi.validate(day2dayPaymentEntryInfo, schema);
}






exports.Day2dayPaymentType = Day2dayPaymentType; 
exports.validateday2dayPaymentType = validateday2dayPaymentType;
 
exports.Day2dayPaymentEntry = Day2dayPaymentEntry; 
exports.validateday2dayPaymentEntry = validateday2dayPaymentEntry; 