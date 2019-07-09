const config = {
	user: process.env.USER || 'whtirado',
	password: process.env.PASSWORD || 'mongo',
	port: process.env.PORT || 5000,
};

exports.mongo = config;
