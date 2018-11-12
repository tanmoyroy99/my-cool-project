const mongoose = require('mongoose');



module.exports = function (req, res, next) {
	mongoose.connect('mongodb://tanmoy:tanmoy@127.0.0.1:27017/dressbook')
	.then(()=> {console.log('DB connected...');
		next();
	})
	.catch(err=> {
		
	});
	
}