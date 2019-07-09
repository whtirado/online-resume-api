const localOrigin = 'http://localhost:4200';
const prodOrigin = 'https://whtirado-online-resume.herokuapp.com';

const config = {
	user: process.env.USER || 'whtirado',
	password: process.env.PASSWORD || 'mongo',
	port: process.env.PORT || 5000,
	origin: process.env ? prodOrigin : localOrigin,
};

exports.mongo = config;
