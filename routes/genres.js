const {Regdata,validateGenre} = require('../models/modeldb');
//const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


function asingMiddleware(hanler){
	return async (req,res,next)=>{
		try{
			await hanler(req,res);
		}catch(ex){
			next(ex);
			
		}
	};
}

/* ------------------------------------ View ------------------------------------- */
router.get('/', asingMiddleware( async (req, res) => {
  const genres = await Regdata.find().sort('name');
  res.send(genres);
}));
/* ------------------------------------------------------------------------- */



/* --------------------------------- ADD ---------------------------------------- */

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let regdata = new Regdata({ name: req.body.name,emailId: req.body.emailId,phoneNo: req.body.phoneNo, datetime: Date.now(),   });
  regdata = await regdata.save();
  
  res.send(regdata);
});
/* ------------------------------------------------------------------------- */



/* ---------------------------------- EDIT --------------------------------------- */
router.put('/:id', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const regdata = await Regdata.findByIdAndUpdate(req.params.id, { name: req.body.name,emailId: req.body.emailId,phoneNo: req.body.phoneNo, }, {
    new: true
  });

  if (!regdata) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(regdata);
});
/* ------------------------------------------------------------------------- */



router.get('/test/', (req, res) => {
    res.send('Test...###!!');

  });

  

module.exports = router;