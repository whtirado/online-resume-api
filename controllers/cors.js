const corsCtrl = require('../config/server.config');

exports.headers = (req, res, next) => {
	res.setHeader(
		'Access-Control-Allow-Origin',
		'https://whtirado-online-resume.herokuapp.com'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE, OPTIONS'
	);
	next();
};
