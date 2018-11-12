const {Userdata} = require('../models/user_db');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcryptjs');



router.post('/', async (req, res) => { 

	const { error } = validlogin(req.body); 
	if (error) return res.status(400).send(error.details[0].message);
	
	let userdata = await Userdata.findOne({ emailId: req.body.emailId });
	if (!userdata) return res.status(400).send('Invalid email or password.');
	
	const validPassword = await bcrypt.compare(req.body.password, userdata.password);
	if (!validPassword) return res.status(400).send('Invalid email or password...');
	
	
	
	const token = userdata.generateAuthToken();
	res.send(token);


});

function validlogin(logindetails){
	  const schema = {
		emailId: Joi.string().min(5).max(50).required().email(),
		password: Joi.string().min(5).max(15).required(),
	  };

  return Joi.validate(logindetails, schema);
	
}



module.exports = router;