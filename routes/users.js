const {Userdata, validateUser} = require('../models/user_db');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');



router.get('/', async (req, res) => {
  const genres = await Userdata.find().sort('datetime');
  //const token = jwt.sign({ _id: 'TestId', isAdmin: 'Test admin' }, 'test_jwtPrivateKey', { expiresIn: '1m' });
  res.send(genres);
});

router.get('/me', authentication, async (req, res) => {
  const genres = await Userdata.findById(req.userdata._id);
  res.send(genres);
});


router.post('/', async (req, res) => { 
  const { error } = validateUser(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
  
  let user = await Userdata.findOne({ emailId: req.body.emailId });
  if (user) return res.status(400).send('User already registered...');
   
  let phone = await Userdata.findOne({ phoneNo: req.body.phoneNo });
  if (phone) return res.status(400).send('This phone number is already used, please enter the new valid phone number...');

  let user_agent= req.get('User-Agent');
  let ip_address = req.connection.remoteAddress
  
  let userdata = new Userdata(
  {
  name: req.body.name,
  emailId: req.body.emailId,
  phoneNo: req.body.phoneNo, 
  password: req.body.password, 
  note: JSON.stringify({"User Agent": user_agent, "IP Address":ip_address}), 
  datetime: Date.now(),
  status: true,
  });
  
  const salt = await bcrypt.genSalt(10);
  userdata.password = await bcrypt.hash(userdata.password, salt);
  
  
  userdata = await userdata.save();
  
  res.send(_.pick(userdata, ['_id', 'name', 'emailId','phoneNo','note','status']));
});



module.exports = router;