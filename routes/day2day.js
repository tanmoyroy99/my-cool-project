const {Day2dayPaymentType, validateday2dayPaymentType, Day2dayPaymentEntry, validateday2dayPaymentEntry} = require('../models/day2day_db');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const authentication = require('../middleware/authentication');


function asingMiddleware(hanler){
	return async (req,res,next)=>{
		try{
			await hanler(req,res);
		}catch(ex){
			next(ex);
			
		}
	};
}



/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */

router.post('/type/', authentication,  async (req, res) => { 

	const { error } = validateday2dayPaymentType(req.body); 
	if (error) return res.status(400).send(error.details[0].message);
	
	let user_agent= req.get('User-Agent');
	let ip_address = req.connection.remoteAddress;
	
	let day2dayPaymentType = new Day2dayPaymentType({
													user_id: req.userdata._id,
													type_name: req.body.type_name,
													user_note: req.body.user_note,
													system_note: JSON.stringify({"User Agent": user_agent, "IP Address":ip_address}),
													datetime: Date.now(),
													status: true,
												});
	day2dayPaymentType = await Day2dayPaymentType.save();
	
	res.send(day2dayPaymentType);

});

/* --------------------------------------------------------------------------------------------------------- */

router.get('/type/all/', authentication, async (req, res) => {
	
	const day2dayPaymentTypeviewAll = await Day2dayPaymentType.find({ user_id: req.userdata._id});
	res.send(day2dayPaymentTypeviewAll);
});

/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */


router.post('/info/', authentication, async (req, res) => { 

	const { error } = validateday2dayPaymentEntry(req.body); 
	if (error) return res.status(400).send(error.details[0].message);
	
	let user_agent= req.get('User-Agent');
	let ip_address = req.connection.remoteAddress;
	
	let day2dayPaymentEntry = new Day2dayPaymentEntry({
													user_id: req.userdata._id,
													day2day_info: req.body.day2day_info,
													day2day_amount: req.body.day2day_amount,
													day2dayPaymentType_id: req.body.day2dayPaymentType_id,
													user_note: req.body.user_note,
													system_note: JSON.stringify({"User Agent": user_agent, "IP Address":ip_address}),
													datetime: Date.now(),
													status: true,
												});
	day2dayPaymentEntry = await day2dayPaymentEntry.save();
	
	res.send(day2dayPaymentEntry);

});

/* --------------------------------------------------------------------------------------------------------- */

router.get('/info/all/', authentication, async (req, res) =>{
	const day2dayPaymentEntryviewAll = await Day2dayPaymentEntry.find({ user_id: req.userdata._id});
	res.send(day2dayPaymentEntryviewAll);
});

/* --------------------------------------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------------------------------------- */





module.exports = router;

